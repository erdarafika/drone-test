<template lang="pug">
app-container
  .table-header
    el-row
      el-col(:span='16')
        h2.title  List Of Member
      el-col(:span='8')
        el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
          | {{ $t('table.add') }}
        el-button.filter-item.import-button(style='margin-left: 10px;float:right', type='primary', @click='handleImport')
          | {{ $t('table.import') }}
        el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleExport')
          | {{ $t('table.exportToXlsx') }}
  .complex-filter-container
    .complex-filter-item
      .title | {{ $t('table.filter') }}
      el-form(label-position='left')
        el-form-item(:label="$t('table.status')")
          el-radio-group(v-model='listQuery.status')
            el-radio(v-for='option in statusOptions'  :key='option.value' :label='option.value') {{ option.label }}
      el-form(:inline='true')
        el-form-item(:label="$t('membership.name')")
          el-input.filter-item(v-model='listQuery.name', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('membership.certificateNumber')")
          el-input.filter-item(v-model='listQuery.certificateNumber', prefix-icon='el-icon-search', style='width: 200px;')
        el-form-item(:label="$t('membership.groupId')")
          el-select(placeholder='Select' v-model='listQuery.group' name='groupId')
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('membership.certificateNumber')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.certificateNumber }}
    el-table-column(:label="$t('membership.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('membership.groupId')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.group.name }}
    el-table-column(:label="$t('membership.effectiveDate')", align='left')
      template(slot-scope='scope')
        | {{ scope.row.effectiveDate | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('membership.certificateStatus')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.certificateStatus }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
        Edit(v-if="row.certificateStatus === 'draft' || row.certificateStatus === 'rejected'" :data='row' :action='handleUpdate')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title="$t('modal.exportModalHeader')", :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('membership.groupId')", prop='groupId')
        el-select(v-model='temp.groupId', name='groupId' placeholder='Select', filterable, default-first-option)
          el-option(:key='0', :label="$t('table.selectAll')", :value='0')
          el-option(v-for='item in groupExportOptions', :key='item.value', :label='item.label', :value='item.value')
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="exportData")
        | {{ $t('table.export') }}
</template>

<style>
.multi-form {
  padding: 10px;
}
.pane .el-tab-pane {
  padding: 15px;
  padding-left: 20px;
}

.company-information-form .el-form-item--medium .el-form-item__label {
  line-height: 10px !important;
}
</style>

<script>
import { fetchList, exportExcel } from '@/api/membership'
import { fetchGroupMaintanance as fetchGroupById, fetchList as fetchGroup } from '@/api/group-maintenance'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Member',
  components: { Pagination },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableKey: 0,
      list: [],
      groupOptions: [],
      groupExportOptions: [],
      statusOptions: [
        { label: 'Show All', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Terminated', value: 'terminated' }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        certificateNumber: undefined,
        name: undefined
      },
      temp: {
        groupId: undefined
      },
      rules: {
        groupId: [requiredValidator]
      }
    }
  },
  computed: {
    filterredList() {
      const { status, name, certificateNumber, group, limit, page } = this.listQuery
      let listAfterSearch = this.list
      listAfterSearch = listAfterSearch.filter(data => !name || String(data.name).toLowerCase().includes(name.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !status || String(data.certificateStatus).toLowerCase().includes(status.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !certificateNumber || String(data.certificateNumber).toLowerCase().includes(certificateNumber.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !group || String(data.group.name).toLowerCase() === group.toLowerCase())

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    fetchGroup().then(res => {
      this.groupOptions = res.map(group => ({ value: group.name, label: group.name }))
      this.groupExportOptions = res.map(group => ({ value: group.id, label: group.name }))
    })
    this.getList()
  },
  methods: {
    handleUpdate(row) {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'update' }, query: { id: row.id }})
    },
    handleDetail(row) {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'create' }})
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        response.forEach(function(data) {
          if (Number.isInteger(data.group)) {
            fetchGroupById(data.group).then(group => {
              data.group = group
            })
          }
        })
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    exportData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.groupId === 0) {
            exportExcel().then((response) => {
              if (response.status_code >= 200 && response.status_code <= 300) {
                this.saveAs(response, 'members.xlsx')
              }
            })
          } else {
            exportExcel(this.temp).then((response) => {
              if (response.status_code >= 200 && response.status_code <= 300) {
                this.saveAs(response, 'members.xlsx')
              }
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    handleImport() {
      this.$router.push({ name: 'MemberMaintenanceImport' })
    },
    handleExport() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        groupId: undefined
      }
    }
  }
}
</script>


<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('dplkStaff.name')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('dplkStaff.nip')", align='left', width="180")
      template(slot-scope='scope')
        span {{ scope.row.identityNumber }}
    el-table-column(:label="$t('dplkStaff.email')", align='left', width="180")
      template(slot-scope='scope')
        span {{ scope.row.email }}
    el-table-column(:label="$t('dplkStaff.department')", align='left', width="120")
      template(slot-scope='scope')
        span {{ scope.row.department.name }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}

    el-table-column(label='', align='right',  width='280')
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate')
        Delete(:data='row' :action='handleDelete')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkStaff.name')", prop='name')
        el-input(v-model.number='temp.name', name='name' type='input')
      el-form-item(:label="$t('dplkStaff.nip')", prop='identityNumber')
        el-input(v-model.number='temp.identityNumber', name='identityNumber' type='input')
      el-form-item(:label="$t('dplkStaff.email')", prop='email')
        el-input(v-model.number='temp.email', name='email' type='input')
      el-form-item(:label="$t('dplkStaff.department')", prop='departmentId')
        el-select(v-model='temp.departmentId', name='departmentId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in departmentOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkStaff, updateDplkStaff, deleteDplkStaff } from '@/api/dplk-staff'
import { fetchList as fetchDepartmentList } from '@/api/department'
import { requiredValidator, emailValidator } from '@/global-function/formValidator'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Document',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      roleList: [],
      departmentOptions: [],
      temp: {
        name: undefined,
        identityNumber: undefined,
        email: undefined,
        departmentId: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator],
        email: [requiredValidator, emailValidator],
        departmentId: [requiredValidator],
        identityNumber: [requiredValidator]
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    fetchDepartmentList().then(res => {
      this.departmentOptions = res.map(department => ({ value: department.id, label: department.name }))
    })
    this.getList()
  },
  methods: {
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        identityNumber: undefined,
        email: undefined,
        departmentId: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          createDplkStaff(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        name: row.name,
        identityNumber: row.identityNumber,
        email: row.email,
        departmentId: row.department.id
      } // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateDplkStaff(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.$notify({
        title: this.$t('table.cancelTitle'),
        message: this.$t('table.cancelCaption'),
        type: 'warning',
        duration: 2000
      })

      const deleteCallback = () => {
        deleteDplkStaff(row).then((response) => {
          this.dialogFormVisible = false
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

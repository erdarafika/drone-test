<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="`Data Name`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.dataName }}
    el-table-column(:label="`Document Name`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.documentName }}
    el-table-column(:label="`Status`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='`Add`', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px')
      el-row(:gutter='40')
        el-col(:span='12')
          el-form-item(:label="`Product Type`", prop='productType')
            el-select(v-model='temp.productType', name='productType' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(:label="`Company`", prop='company')
            el-select(v-model='temp.company', name='company' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
        el-col(:span='12')
          el-form-item(:label="`Group`", prop='group')
            el-select(v-model='temp.group', name='group' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(:label="`Member`", prop='member')
            el-select(v-model='temp.member', name='member' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in memberOptions', :key='item.value', :label='item.label', :value='item.value')
      hr(style='margin-bottom:20px;border-color:#ffffff54')
      el-row(:gutter='40')
        el-col(:span='12')
          el-form-item(:label="`Document Type`", prop='documentType')
            el-select(v-model='temp.documentType', name='documentType' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in documentTypeOptions', :key='item.value', :label='item.label', :value='item.value')
          el-form-item.document(:label="`Import File`", prop='importFile')
            upload-excel-component(:on-success='handleSuccess', :before-upload='beforeUpload' style='width: 100%;')
        el-col(:span='12')
            //- h4(style='color:#646266') Billing Data Preview
            el-table(:data='tableData', border='', highlight-current-row='')
              el-table-column(v-for='item of tableHeader', :key='item', :prop='item', :label='item')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="createData()")
        | {{ $t('table.requestApproval') }}
</template>

<style lang="scss">
.fund-transfer-arrow {
  display: block;
  margin: auto;
  width: 3em !important;
  margin-top: 25px;
  height: 3em !important;
}

.document .drop {
    line-height: 60px !important;
}
</style>

<script>
import { fetchList, createRecord } from '@/api/static/alteration-document'
import Pagination from '@/components/Pagination'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchList as fetchMember } from '@/api/static/member-maintenance'

import rules from './validation-rules'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      tableData: [],
      tableHeader: [],
      listLoading: true,
      dialogFormVisible: false,
      productTypeOptions: [{ label: 'Product Type 1', value: 'Product Type 1' }],
      documentTypeOptions: [{ label: 'Document 1', value: 'Document 1' }],
      companyOptions: [],
      groupOptions: [],
      memberOptions: [],
      temp: {
        company: undefined,
        group: undefined,
        member: undefined,
        productType: undefined,
        documentType: undefined,
        importFile: undefined
      },
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      rules
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.dataName.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
    fetchCompany().then(res => {
      res = res.filter(item => item.status === 'active')
      this.companyOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active')
      this.groupOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
    fetchMember().then(res => {
      res = res.filter(item => item.status === 'active')
      this.memberOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.temp.importFile = { header, results }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate('importFile')
      })

      this.tableData = results
      this.tableHeader = header
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRecord(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        company: undefined,
        group: undefined,
        member: undefined,
        productType: undefined,
        documentType: undefined,
        importFile: undefined
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    }
  }
}
</script>

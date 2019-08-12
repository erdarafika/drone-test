<template lang="pug">
app-container
  el-tabs(type='border-card')
    el-tab-pane(label='Billing PPIP Organization')
      el-row(:gutter='40')
        el-col(:span='12')
          el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px', style='width: 80%')
            el-form-item(:label="`Company`", prop='companyId')
              el-select(v-model='temp.companyId', name='company' placeholder='Select', filterable, default-first-option)
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="`Group`", prop='groupId')
              el-select(v-model='temp.groupId', name='group' placeholder='Select', filterable, default-first-option)
                el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="`Effective Date`", prop='effectiveDate' )
              el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', type='date', placeholder='Pick a day' name='date')
            el-form-item(:label="`Import Billing`", prop='billing')
              upload-excel-component(:on-success='handleSuccess', :before-upload='beforeUpload' style='width: 100%;')
            el-form-item
              RequestApproval.pull-right(:callback='requestApproval')
              el-button.pull-right(size='small' @click='resetTemp') Cancel
        el-col(:span='12')
          h4(style='color:#646266') Billing Data Preview
          el-table(:data='tableData', border='', highlight-current-row='')
            el-table-column(v-for='item of tableHeader', :key='item', :prop='item', :label='item')

</template>

<script>
import { createRecord, approveRecord } from '@/api/static/contribution-billing-ppip-organization'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import rules from './validation-rules'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  components: { UploadExcelComponent },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableData: [],
      tableHeader: [],
      listLoading: true,
      companyOptions: [],
      groupOptions: [],
      temp: {
        companyId: undefined,
        groupId: undefined,
        effectiveDate: undefined,
        billing: undefined
      },
      rules
    }
  },
  created() {
    this.resetTemp()
    fetchCompany().then(res => {
      res = res.filter(item => item.status === 'active')
      this.companyOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active')
      this.groupOptions = res.map(item => ({ value: item.id, label: item.name }))
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
      this.temp.billing = { header, results }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate('billing')
      })

      this.tableData = results
      this.tableHeader = header
    },
    requestApproval() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRecord(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              approveRecord(this.temp).then(response => {
                if (response.status_code >= 200 && response.status_code <= 300) {
                  this.successNotifier()
                }
                this.$router.push({ name: 'ContributionBilling' })
              })
            }
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        companyId: undefined,
        groupId: undefined,
        effectiveDate: undefined,
        billing: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


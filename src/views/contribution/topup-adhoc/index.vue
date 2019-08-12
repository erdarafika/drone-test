<template lang="pug">
app-container
  el-tabs(type='border-card')
    el-tab-pane(label='Top Up Ad Hoc')
      el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px')
        el-form-item(:label="`PPIP Type`", prop='ppipType' style='margin-left: 18px;')
          el-select(v-model='temp.ppipType', name='ppipType' placeholder='Select', filterable, default-first-option)
            el-option(v-for='item in ppipTypeOptions', :key='item.value', :label='item.label', :value='item.value')
        el-tabs.pane(tab-position='top', style='height:100%;padding: 20px')
          el-tab-pane(label='Organization')
            el-row(:gutter='40')
              el-col(:span='12')
                  el-form-item(:label="`Company`", prop='orgCompanyId')
                    el-select(v-model='temp.orgCompanyId', name='company' placeholder='Select', filterable, default-first-option)
                      el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
                  el-form-item(:label="`Group`", prop='orgGroupId')
                    el-select(v-model='temp.orgGroupId', name='group' placeholder='Select', filterable, default-first-option)
                      el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
                  el-form-item(:label="`Effective Date`", prop='orgEffectiveDate' )
                    el-date-picker(:value-format='dateFormat' v-model='temp.orgEffectiveDate', type='date', placeholder='Pick a day' name='date')
                  el-form-item(:label="`Import Billing`", prop='orgbilling')
                    upload-excel-component(:on-success='handleSuccess', :before-upload='beforeUpload' style='width: 100%;')
              el-col(:span='12')
                h4(style='color:#646266') Billing Data Preview
                el-table(:data='tableData', border='', highlight-current-row='')
                  el-table-column(v-for='item of tableHeader', :key='item', :prop='item', :label='item')
          el-tab-pane(label='Individu')
            el-form-item(:label="`Company`", prop='idvCompanyId')
              el-select(v-model='temp.idvCompanyId', name='company' placeholder='Select', filterable, default-first-option)
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="`Group`", prop='idvGroupId')
              el-select(v-model='temp.idvGroupId', name='group' placeholder='Select', filterable, default-first-option)
                el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="`Member`", prop='idvMemberId')
              el-select(v-model='temp.idvMemberId', name='member' placeholder='Select', filterable, default-first-option)
                el-option(v-for='item in memberOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="`Effective Date`", prop='idvEffectiveDate' )
              el-date-picker(:value-format='dateFormat' v-model='temp.idvEffectiveDate', type='date', placeholder='Pick a day' name='date')
            el-form-item(:label="`Amount`", prop='idvAmount')
              el-input(v-model.number='temp.idvAmount', name='amount' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
        div
          RequestApproval.pull-right(:callback='requestApproval')
          el-button.pull-right(size='small' @click='resetTemp') Cancel

</template>

<script>
import { createRecord, approveRecord } from '@/api/static/contribution-topup-adhoc'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchList as fetchMember } from '@/api/static/member-maintenance'
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
      ppipTypeOptions: [{ label: 'Type 1', value: 1 }, { label: 'Type 2', value: 2 }],
      companyOptions: [],
      groupOptions: [],
      memberOptions: [],
      temp: {
        orgCompanyId: undefined,
        orgGroupId: undefined,
        orgEffectiveDate: undefined,
        orgbilling: undefined,
        idvCompanyId: undefined,
        idvGroupId: undefined,
        idvMemberId: undefined,
        idvEffectiveDate: undefined
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
      this.temp.orgbilling = { header, results }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate('orgbilling')
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
        orgCompanyId: undefined,
        orgGroupId: undefined,
        orgEffectiveDate: undefined,
        orgbilling: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


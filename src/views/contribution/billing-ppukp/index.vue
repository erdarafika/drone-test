<template lang="pug">
app-container
  el-tabs(type='border-card')
    el-tab-pane(label='Billing PPUKP')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px', style='width: 80%')
        el-form-item(:label="`Company`", prop='companyId')
          el-select(v-model='temp.companyId', name='company' placeholder='Select', filterable, default-first-option)
            el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(:label="`Group`", prop='groupId')
          el-select(v-model='temp.groupId', name='group' placeholder='Select', filterable, default-first-option)
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(:label="`Effective Date`", prop='effectiveDate' )
          el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', type='date', placeholder='Pick a day' name='date')
        el-form-item(:label="`Amount`", prop='amount')
          el-input(v-model.number='temp.amount', name='amount' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
        el-form-item
          RequestApproval.pull-right(:callback='requestApproval')
          el-button.pull-right(size='small' @click='resetTemp') Cancel
</template>

<script>
import { createRecord, approveRecord } from '@/api/static/contribution-billing-ppukp'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import rules from './validation-rules'

export default {
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      listLoading: true,
      companyOptions: [],
      groupOptions: [],
      temp: {
        companyId: undefined,
        groupId: undefined,
        effectiveDate: undefined,
        amount: undefined
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
        amount: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'ContributionBilling'}) }")
  el-tabs(type='border-card')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px', style='width: 80%')
        el-form-item(:label="$t('billing.groupId')", prop='groupId')
          el-select(v-model='temp.groupId', name='group' placeholder='Select', filterable, default-first-option)
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(:label="$t('billing.amount')", prop='amount')
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend Rp
            money.el-input__inner(v-model.number='temp.amount', name='amount' v-bind='configSeparator')
        el-form-item
          table.pull-right
            td
              Cancel(:callback='resetTemp')
            td
              RequestApproval(:callback='requestApproval')
</template>

<script>
import { createRecord } from '@/api/contribution-billing'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchMathConfig } from '@/api/config'
import rules from './validation-rules'

export default {
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      listLoading: true,
      companyOptions: [],
      groupOptions: [],
      configSeparator: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      temp: {
        companyId: undefined,
        groupId: undefined,
        billingType: undefined,
        amount: undefined
      },
      rules
    }
  },
  created() {
    this.resetTemp()
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active' && item.productType.code === 'dplk-ppukp')
      this.groupOptions = res.map(item => ({ value: item.id, label: item.name + ' - ' + item.company.name }))
    })
    fetchMathConfig({ code: 'amount', type: 'separator' }).then(res => {
      if (res.length) {
        this.configSeparator.precision = res[0].value
      }
    })
  },
  methods: {
    back() {
      this.$router.push({ name: 'ContributionBilling' })
    },
    requestApproval() {
      this.temp.billingType = 'dplk-ppukp'
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRecord(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.back()
            }
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        companyId: undefined,
        groupId: undefined,
        amount: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


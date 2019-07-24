
<template lang="pug">
div
  el-form.dplk-information-form(:model='groupWithdrawal', :rules='rules', ref='dataForm', label-width='300px')
    el-form-item(:label="$t('groupWithdrawal.isPartialAllowed')" prop="isPartialAllowed")
      el-switch(v-model='groupWithdrawal.isPartialAllowed' name='isPartialAllowed')
      span.switch-status {{ groupWithdrawal.isPartialAllowed?'Yes':'No' }}
    el-form-item(:label="$t('groupWithdrawal.minimumWithdrawalYear')" prop="minimumWithdrawalYear")
      el-input-number(v-model='groupWithdrawal.minimumWithdrawalYear'  name='minimumWithdrawalYear' )
    el-form-item(:label="$t('groupWithdrawal.maximumWithdrawalFrequency')" prop="maximumWithdrawalFrequency")
      el-input-number(v-model='groupWithdrawal.maximumWithdrawalFrequency'  name='maximumWithdrawalFrequency')
    el-form-item(:label="$t('groupWithdrawal.maximumWithdrawalFrequency')" prop="maximumWithdrawalFrequency")
      el-input-number(v-model='groupWithdrawal.minimumWithdrawalAmount'  name='minimumWithdrawalAmount')
    el-form-item(:label="$t('groupWithdrawal.minimumWithdrawalAmount')" prop="minimumWithdrawalAmount")
      el-input-number(v-model.number='groupWithdrawal.maximumWithdrawalPercentage'  name='maximumWithdrawalPercentage')
    el-form-item(:label="$t('groupWithdrawal.maximumWithdrawalAmount')" prop="maximumWithdrawalAmount")
      el-input-number(v-model.number='groupWithdrawal.maximumWithdrawalAmount'  name='maximumWithdrawalAmount')
    el-form-item(:label="$t('groupWithdrawal.normalRetireAge')" prop="normalRetireAge")
      el-input-number(v-model.number='groupWithdrawal.normalRetireAge' :min="40"  name='normalRetireAge')
    el-form-item(:label="$t('groupWithdrawal.earlyRetireAge')" prop="earlyRetireAge")
      el-input-number(v-model.number='groupWithdrawal.earlyRetireAge' :min="30" name='earlyRetireAge')

    el-form-item(v-crud-permission="['maker']")
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}

</template>
<style>
.dplk-information-form {
  display: block;
  max-width: 700px;
}
</style>

<script>
import { fetchGroupWithdrawal, updateGroupWithdrawal } from '@/api/group-withdrawal'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'GroupWithdrawal',
  props: ['data'],
  data() {
    return {
      groupWithdrawal: {
        isPartialAllowed: false,
        minimumWithdrawalYear: 1,
        maximumWithdrawalFrequency: 1,
        minimumWithdrawalAmount: 1,
        maximumWithdrawalPercentage: 1,
        maximumWithdrawalAmount: 1,
        normalRetireAge: 40,
        earlyRetireAge: 30,
        groupId: undefined
      },
      rules: {
        isPartialAllowed: [requiredValidator],
        minimumWithdrawalYear: [requiredValidator],
        maximumWithdrawalFrequency: [requiredValidator],
        minimumWithdrawalAmount: [requiredValidator],
        maximumWithdrawalPercentage: [requiredValidator],
        maximumWithdrawalAmount: [requiredValidator],
        normalRetireAge: [requiredValidator],
        earlyRetireAge: [requiredValidator]
      },
      isLoading: false
    }
  },
  created() {
    if (this.data.id) {
      this.getGroupWithdrawal()
      this.groupWithdrawal.groupId = this.data.id
    }
  },
  methods: {
    getGroupWithdrawal() {
      this.isLoading = true
      fetchGroupWithdrawal(this.data.id).then(response => {
        const { early_retire_age, is_partial_allowed, maximum_withdrawal_amount, maximum_withdrawal_frequency, maximum_withdrawal_percentage, minimum_withdrawal_amount, minimum_withdrawal_year, normal_retire_age } = response
        this.groupWithdrawal = Object.assign(this.groupWithdrawal, {
          earlyRetireAge: early_retire_age,
          isPartialAllowed: is_partial_allowed || false,
          maximumWithdrawalAmount: maximum_withdrawal_amount,
          maximumWithdrawalFrequency: maximum_withdrawal_frequency,
          maximumWithdrawalPercentage: maximum_withdrawal_percentage,
          minimumWithdrawalAmount: minimum_withdrawal_amount,
          minimumWithdrawalYear: minimum_withdrawal_year,
          normalRetireAge: normal_retire_age })
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        this.isLoading = false
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateGroupWithdrawal(this.groupWithdrawal, this.data.id).then(() => {
            this.successNotifier()
          })
        }
      })
    }
  }
}
</script>

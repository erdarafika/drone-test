
<template lang="pug">
app-container

  el-form.withdrawal-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='280px', style='width: 80%; margin-left:50px;')
    h3.form-title {{ $t('route.withdrawalRule') }}
    el-form-item(:label="$t('withdrawalRule.maxPerYear')", prop='maxWIthdrawalFrequencyPerYear')
      el-input(v-model.number='temp.maxWIthdrawalFrequencyPerYear')
    el-form-item(:label="$t('withdrawalRule.minAmmount')", prop='minWithdrawalAmount')
      el-input(v-model.number='temp.minWithdrawalAmount')
    el-form-item(:label="$t('withdrawalRule.minEffectiveYear')", prop='minEffectiveYear')
      el-input(v-model.number='temp.minEffectiveYear')
    //- el-form-item(:label="$t('withdrawalRule.normalRetiringAge')", prop='normalRetiringAge')
    //-   el-input(v-model.number='temp.normalRetiringAge')
    el-form-item(:label="$t('withdrawalRule.differenceRetiringAge')", prop='maxDifferentEarlyRetire')
      el-input(v-model.number='temp.maxDifferentEarlyRetire')
    el-form-item
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}
</template>
<style>
.withdrawal-form {
  display: block;
  max-width: 700px;
}

.form-title {
  color: #606266;
  padding-bottom: 10px;
  border-bottom: 1px solid #dfe4ed;
}
</style>

<script>
import { fetchWithdrawalRule, updateWithdrawalRule } from '@/api/withdrawal-rule'
import rules from './validation-rules'

export default {
  name: 'WithdrawalRule',
  data() {
    return {
      temp: {
        maxDifferentEarlyRetire: 0, // TODO: TYPO
        maxWIthdrawalFrequencyPerYear: 0, // TODO: TYPO
        minEffectiveYear: 0,
        minWithdrawalAmount: 0
      },
      rules,
      isLoading: false
    }
  },
  created() {
    this.getWithdrawalRule()
  },
  methods: {
    getWithdrawalRule() {
      this.isLoading = true
      fetchWithdrawalRule().then(res => {
        this.temp = {
          maxDifferentEarlyRetire: res.maxDifferentEarlyRetireAge,
          maxWIthdrawalFrequencyPerYear: res.maxWithdrawalFrequencyPerYear,
          minEffectiveYear: res.minEffectiveYear,
          minWithdrawalAmount: res.minWithdrawalAmount
        }
        this.isLoading = false
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateWithdrawalRule(this.temp).then(() => {
            this.successNotifier()
          })
        }
      })
    }
  }
}
</script>

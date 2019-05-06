
<template lang="pug">
.app-container

  el-form.withdrawal-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='240px', style='width: 80%; margin-left:50px;')
    h3.form-title {{ $t('route.withdrawalRule') }}
    el-form-item(:label="$t('withdrawalRule.maxPerYear')", prop='maxPerYear')
      el-input(v-model='temp.maxPerYear')
    el-form-item(:label="$t('withdrawalRule.minAmmount')", prop='minAmmount')
      el-input(v-model.number='temp.minAmmount')
    el-form-item(:label="$t('withdrawalRule.minEffectiveYear')", prop='minEffectiveYear')
      el-input(v-model.number='temp.minEffectiveYear')
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

export default {
  name: 'WithdrawalRule',
  data() {
    return {
      temp: {
        id: undefined,
        maxPerYear: undefined,
        minAmmount: undefined,
        minEffectiveYear: undefined,
        isActive: true,
        createdDate: undefined
      },
      rules: {
        maxPerYear: [{ required: true, message: 'this field is required' }],
        minAmmount: [{ required: true, message: 'this field is required' }],
        minEffectiveYear: [{ required: true, message: 'this field is required' }]
      },
      isLoading: false
    }
  },
  created() {
    this.getWithdrawalRule()
  },
  methods: {
    getWithdrawalRule() {
      this.isLoading = true
      fetchWithdrawalRule().then(response => {
        this.temp = response.data.items
        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateWithdrawalRule().then(() => {
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

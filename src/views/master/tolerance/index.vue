
<template lang="pug">
.app-container
  el-form.tolerance-form(:model='tolerance', :rules='rules', ref='dataForm', label-width='120px')
    el-form-item(label='Amount' prop="amount")
      .el-input(data-children-count='1')
        money.el-input__inner(v-model='tolerance.amount', v-bind='moneyConfig' )
    el-form-item
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}

</template>
<style>
.tolerance-form {
  display: block;
  max-width: 400px;
}
</style>

<script>
import { fetchTolerance, updateTolerance } from '@/api/tolerance'

export default {
  name: 'Tolerance',
  data() {
    return {
      tolerance: {
        amount: 0
      },
      rules: {
        amount: [
          { required: true, message: 'Amount is required', trigger: 'change' }
        ]
      },
      isLoading: false,
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp ',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  created() {
    this.getTolerance()
  },
  methods: {
    getTolerance() {
      this.isLoading = true
      fetchTolerance().then(response => {
        if ('response_data' in response) { this.tolerance.amount = response.data } else { this.tolerance.amount = response.amount }

        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateTolerance(this.tolerance).then(() => {
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })

            this.getTolerance()
          })
        }
      })
    }
  }
}
</script>

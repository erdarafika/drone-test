
<template lang="pug">
.app-container
  el-form.company-form(:model='company', :rules='rules', ref='dataForm', label-width='120px')
    el-form-item()
      el-alert(effect="dark" show-icon title='On Progress Wait For Backend API', type='warning')
    el-form-item(:label='$t("companyInformation.name")' prop="name")
      el-input(v-model='company.name', type='textarea', :autosize='{ minRows: 1, maxRows: 1}')
    el-form-item
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}

</template>
<style>
.company-form {
  display: block;
  max-width: 400px;
}
</style>

<script>
import { fetchCompany, updateCompany } from '@/api/company'

export default {
  name: 'Company',
  data() {
    return {
      company: {
        name: 0
      },
      rules: {
        name: [
          { required: true, message: 'this field is required' }
        ]
      },
      isLoading: false
    }
  },
  created() {
    this.getCompany()
  },
  methods: {
    getCompany() {
      this.isLoading = true
      fetchCompany().then(res => {
        console.log(res)

        this.company = res

        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateCompany(this.company).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getCompany()
            }
          })
        }
      })
    }
  }
}
</script>

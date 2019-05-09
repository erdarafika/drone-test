
<template lang="pug">
.app-container
  el-form.dplk-information-form(:model='dplkInformation', :rules='rules', ref='dataForm', label-width='200px')
    el-form-item(:label="$t('dplkInformation.name')" prop="name")
        el-input(v-model='dplkInformation.name' )
    el-form-item(:label="$t('dplkInformation.website')" prop="website")
        el-input(v-model='dplkInformation.website' )
    el-form-item(:label="$t('dplkInformation.email')" prop="email")
        el-input(v-model='dplkInformation.email' )
    el-form-item(:label="$t('dplkInformation.telpNumber')" prop="telpNumber")
        el-input(v-model.number='dplkInformation.telpNumber' )
    el-form-item(:label="$t('dplkInformation.fax')" prop="fax")
        el-input(v-model.number='dplkInformation.fax' )
    el-form-item
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}

</template>
<style>
.dplk-information-form {
  display: block;
  max-width: 700px;
}
</style>

<script>
import { fetchDplkInformation, updateDplkInformation } from '@/api/dplk-information'

export default {
  name: 'DplkInformation',
  data() {
    return {
      dplkInformation: {
        name: undefined,
        website: undefined,
        email: undefined,
        telpNumber: undefined,
        fax: undefined
      },
      rules: {
        name: [
          { required: true, message: 'This field is required' }
        ],
        website: [
          { required: true, message: 'This field is required' }
        ],
        email: [
          { required: true, message: 'This field is required' }, { type: 'email', message: 'Invalid Email Address' }
        ],
        telpNumber: [
          { required: true, message: 'This field is required' }, { type: 'number', message: 'This field must be number' }
        ],
        fax: [
          { required: true, message: 'This field is required' }, { type: 'number', message: 'This field must be number' }
        ]
      },
      isLoading: false
    }
  },
  created() {
    this.getDplkInformation()
  },
  methods: {
    getDplkInformation() {
      this.isLoading = true
      fetchDplkInformation().then(response => {
        this.dplkInformation = response.data.items
        setTimeout(() => {
          this.isLoading = false
        }, 1.5 * 1000)
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateDplkInformation().then(() => {
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

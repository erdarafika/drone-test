
<template lang="pug">
app-container

  el-form.virtual-account-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px', style='width: 80%; margin-left:50px;')
    h3.form-title {{ $t('route.virtualAccount') }} - {{ $route.name.toUpperCase() }}
    el-form-item(:label="$t('virtualAccount.name')", prop='name')
      el-input(v-model='temp.name')
    el-form-item(:label="$t('virtualAccount.accountCode')", prop='accountCode')
      el-input(v-model.number='temp.accountCode')
    el-form-item(:label="$t('virtualAccount.dplkBank')", prop='dplkBankId')
      el-select(v-model='temp.dplkBankId', placeholder='Select', filterable, default-first-option style="width:100%")
        el-option(v-for='item in bankOptions', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(:label="``")
      el-switch(v-model='temp.status')
      span.switch-status {{ temp.status?'Enabled':'Disabled' }}
    el-form-item
      el-button(type='primary', @click="submitForm('ruleForm')") {{ $t('table.save') }}
</template>
<style>
.virtual-account-form {
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
import { fetchVirtualAccount, updateVirtualAccount } from '@/api/virtual-account'
import { fetchList as fetchBank } from '@/api/bank'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'VirtualAccount',
  data() {
    return {
      temp: {
        id: undefined,
        name: undefined,
        accountCode: undefined,
        dplkBankId: undefined,
        status: undefined,
        isActive: true,
        createdDate: undefined
      },
      rules: {
        name: [requiredValidator],
        accountCode: [requiredValidator],
        dplkBankId: [requiredValidator]
      },
      isLoading: false,
      bankOptions: []
    }
  },
  created() {
    this.getVirtualAccount()
    fetchBank().then(response => {
      this.bankOptions = response.data.items.map((i, index) => ({ label: i.name, value: index }))
    })
  },
  methods: {
    getVirtualAccount() {
      this.isLoading = true
      fetchVirtualAccount().then(response => {
        this.temp = response.data.items
        this.isLoading = false
      })
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateVirtualAccount().then(() => {
            this.successNotifier()
          })
        }
      })
    }
  }
}
</script>

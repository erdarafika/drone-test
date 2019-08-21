<template lang="pug">
app-container
  el-tabs(v-model='activeTab' :tab-position='`left`')
    //- el-tab-pane(:label="$t('config.general')", name='general') {{ $t('config.general') }}
    el-tab-pane(:label="$t('config.password')", name='password')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
        el-form-item(:label="$t('config.currentPassword')" prop='currentPassword')
          el-input(v-model='temp.currentPassword', name='password' type='password')
        el-form-item(:label="$t('config.password')" prop='password')
          el-input(v-model='temp.password', name='password' type='password')
        el-form-item(:label="$t('config.confirmPassword')" prop='confirmPassword')
          el-input(v-model='temp.confirmPassword', name='confirmPassword' type='password')
        el-form-item(:label="$t('config.status')" v-if='dialogStatus==="create"')
          el-switch(v-model='temp.enabled' name='enabled')
          span.switch-status {{ temp.enabled?'Active':'Not Active' }}
        el-form-item
          el-button(type='primary', @click="updatePassword")
            | {{ $t('table.confirm') }}
</template>

<script>

import { requiredValidator } from '@/global-function/formValidator'
import { updatePassword } from '@/api/user'

export default {
  data() {
    return {
      activeTab: 'password',
      rules: {
        currentPassword: [requiredValidator],
        password: [requiredValidator],
        confirmPassword: [requiredValidator]
      },
      temp: {
        password: undefined,
        currentPassword: undefined,
        confirmPassword: undefined
      }
    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'Dashboard' })
    },
    updatePassword() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updatePassword(this.temp).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.back()
            }
          })
        }
      })
    }
  }
}
</script>

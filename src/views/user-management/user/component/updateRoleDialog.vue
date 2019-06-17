<template lang="pug">
el-dialog(:title='`Update Menu`', :visible.sync='visible' :before-close="handleCloseDialog")
  el-form(ref='dataForm', label-position='left', label-width='100px', style='width: 80%; margin-left:50px;')
    el-form-item(:label="$t('user.role')" prop='roles')
      el-checkbox(:indeterminate='roleIsIndeterminate', v-model='roleCheckAll', @change='handleCheckedAllRoleChange') Check all
      div(style='margin: 15px 0;')
      el-checkbox-group(v-model='roleData.roles', @change='handleCheckedAuthorityChange')
        el-checkbox(v-for='role in roleList', :label='role', :key='role') {{role}}
  .dialog-footer(slot='footer')
    el-button(@click='handleCloseDialog')
      | {{ $t('table.cancel') }}
    el-button(type='primary', @click="handleSubmit")
      | {{ $t('table.confirm') }}
</template>

<script>
import { fetchAuthorities } from '@/api/app-const'

export default {
  props: ['visible', 'closeDialog', 'roleData', 'submitData'],
  data() {
    return {
      title: 'Update Menu',
      dialogUpdateMenuVisible: true,
      rules: {

      },
      roleCheckAll: false,
      roleIsIndeterminate: false,
      roleList: []
    }
  },
  created() {
    this.roleList = fetchAuthorities()
  },
  updated() {
    console.log(this.roleData.roles.length, this.roleList.length)

    if (this.roleData.roles.length && this.roleData.roles.length === this.roleList.length) {
      this.roleCheckAll = true
      this.roleIsIndeterminate = false
    } else if (this.roleData.length > 0) {
      this.roleCheckAll = false
    }
  },
  methods: {
    handleSubmit() {
      this.submitData(this.roleData)
    },
    handleCheckedAllRoleChange(val) {
      this.roleData.roles = val ? this.roleList : []
      this.roleIsIndeterminate = false
    },
    handleCheckedAuthorityChange(value) {
      const checkedCount = value.length
      this.roleCheckAll = checkedCount === this.roleList.length
      this.roleIsIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length
    },
    handleCloseDialog() {
      this.closeDialog()
    }
  }
}
</script>


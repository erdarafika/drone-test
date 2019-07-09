<template lang="pug">
el-dialog(:title='`Update Menu`', :visible.sync='visible' :before-close="handleCloseDialog")
  el-form(ref='dataForm', label-position='left', label-width='100px', style='width: 80%; margin-left:50px;')
    el-form-item(:label="$t('user.menu')" prop='menus')
      el-checkbox(:indeterminate='menuIsIndeterminate', v-model='menuCheckAll', @change='handleCheckAllMenusChange') Check all
      div(style='margin: 15px 0;')
      el-checkbox-group(v-model='menuData.menus', @change='handleCheckedMenusChange')
        el-checkbox(v-for='menu in menuList', :label='menu', :key='menu') {{menu}}
  .dialog-footer(slot='footer')
    el-button(@click='handleCloseDialog')
      | {{ $t('table.cancel') }}
    el-button(type='primary', @click="handleSubmit")
      | {{ $t('table.confirm') }}
</template>

<script>
import { fetchMenus } from '@/api/app-const'

export default {
  props: ['visible', 'closeDialog', 'menuData', 'submitData'],
  data() {
    return {
      title: 'Update Menu',
      dialogUpdateMenuVisible: true,
      rules: {

      },
      menuCheckAll: false,
      menuIsIndeterminate: false,
      menuList: []
    }
  },
  created() {
    this.menuList = fetchMenus()
  },
  updated() {
    if (this.menuData.menus.length && this.menuData.menus.length === this.menuList.length) {
      this.menuCheckAll = true
      this.menuIsIndeterminate = false
    } else if (this.menuData.length > 0) {
      this.menuCheckAll = false
    }
  },
  methods: {
    handleSubmit() {
      const menu = new Set(this.menuData.menus)

      this.submitData({ menus: [...menu], id: this.menuData.id })
    },
    handleCheckAllMenusChange(val) {
      this.menuData.menus = val ? this.menuList : []
      this.menuIsIndeterminate = false
    },
    handleCheckedMenusChange(value) {
      const checkedCount = value.length
      this.menuCheckAll = checkedCount === this.menuList.length
      this.menuIsIndeterminate = checkedCount > 0 && checkedCount < this.menuList.length
    },
    handleCloseDialog() {
      this.closeDialog()
    }
  }
}
</script>


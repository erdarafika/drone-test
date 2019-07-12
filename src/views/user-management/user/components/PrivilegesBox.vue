<template lang="pug">

      .box-privileges
        .header
          el-row.head()
            el-col(:span='12' style='font-size: 14px;')
              | Features
            el-col.option-privileges(:span='4')
              | Checker
            el-col.option-privileges.border(:span='4')
              | Approver
            el-col.option-privileges.maker(:span='4')
              | Maker
        .content
          .head {{title}}
          el-form(ref='form' label-position='top' label-width='120px')
            el-form-item(v-for='(privilegeItem, index) in privileges' :key='index')
              el-row
                el-col.menu-privileges(:span='12')
                  el-checkbox(v-model='privilegeItem.menuChecked' @change='cleanPrivileges(index)') {{ privilegeItem.menu }}
                el-radio-group.privilege-group(v-model='checkedPrivilege[index]'   @change='changePrivileges(index, privilegeItem.menu)')
                  el-col.option-privileges(:span='4')
                    el-radio(label='checker' :disabled='!privilegeItem.menuChecked').checker
                  el-col.option-privileges.border(:span='4')
                    el-radio(label='approver' :disabled='!privilegeItem.menuChecked').approver
                  el-col.option-privileges.maker(:span='4')
                    el-radio(label='maker' :disabled='!privilegeItem.menuChecked').maker

</template>

<script>
import { setTimeout } from 'timers'
export default {
  props: ['privileges', 'title', 'handleChange', 'parent'],
  data() {
    return {
      checkedPrivilege: []
    }
  },
  created() {
    setTimeout(() => {
      this.checkedPrivilege = this.privileges.map(item => {
        if (item.privilege.includes('approver')) { return 'approver' } else if (item.privilege.includes('maker')) { return 'maker' } else if (item.privilege.includes('checker')) { return 'checker' } else { return undefined }
      })
    }, 2000)
  },
  methods: {
    cleanPrivileges(index) {
      this.privileges[index].privilege = undefined
    },
    changePrivileges(index, menu) {
      const currentValue = this.checkedPrivilege[index]
      let value

      if (currentValue === 'checker') value = ['checker']
      else if (currentValue === 'maker') value = ['checker', 'maker']
      else value = ['checker', 'approver']
      this.handleChange({ parent: this.parent, menu, index, value })
    }
  }
}
</script>

<style lang='scss'>
  .item {
    padding: 18px 0;
  }
  .box-privileges {

    display: block;
    margin: 10px;
    background: #f3fdff;
    box-shadow: 1px 1px 1px 1px #80808026;
    border-radius: 16px;
    .header {
      padding: 8px 20px 5px 20px;
      .head {
        font-size: 10px;
      }
      .border {
        border-right: 1px solid white;
        border-left: 1px solid white;
      }
    }
    .content {
      padding:20px;
      .el-form-item {
          margin-bottom: 0px;
      }
      .head {
        color: #65656b;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .privilege-group {
        display: inherit;
        line-height: inherit;
        vertical-align: unset;
        font-size: inherit;
      }
    }
  }
  .menu-privileges {
    padding-left: 25px !important;
    .el-checkbox__inner {
      border-radius: 20px;
      border: 1px solid #a1a3a7;
    }
  }
  .border {
    border-right: 1px solid #489bff5e;
    border-left: 1px solid #489bff5e;
  }
  .option-privileges {
    text-align: center;
    .el-radio__label {
        display: none;
    }

    .checker {
      .el-radio__input.is-checked .el-radio__inner {
          background-color: #68e642;
          border-color: #68e642;
      }
    }

    .approver {
      .el-radio__input.is-checked .el-radio__inner {
          background-color: #e9c31b;
          border-color: #e9c31b;
      }
    }

    .maker {
      .el-radio__input.is-checked .el-radio__inner {
          background-color: #e64242;
          border-color: #e64242;
      }
    }
  }

</style>

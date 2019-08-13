<template lang="pug">
app-container
  el-tabs(type='border-card')
    el-tab-pane(label='Matching Suspense')
      el-row(:gutter='12')
        el-col(:span='12')
          el-card(shadow='never')
            el-select(v-model='suspend' placeholder='Additional Suspend')
              el-option(label='Suspend 1', value='Suspend 1')
              el-option(label='Suspend 2', value='Suspend 2')
            svg-icon.pull-right.matching-plus-button(icon-class='plus' @click='handleAddSuspend')
            hr.matching-divider
            el-table(:data='temp.suspend', style='width: 100%' :show-header='false')
              el-table-column(type="index" label='Date', width='20')
              el-table-column(prop='suspend', label='suspend')
              el-table-column(align='left', width='200')
                template(slot-scope='scope')
                  Delete.pull-right(:data='scope.row', :action='handleDeleteSuspend')
        el-col(:span='12')
          el-card(shadow='never')
            el-select(v-model='billing' placeholder='Billing')
              el-option(label='Billing 1', value='Billing 1')
              el-option(label='Billing 2', value='Billing 2')
            svg-icon.pull-right.matching-plus-button(icon-class='plus' @click='handleAddBilling')
            hr.matching-divider
            el-table(:data='temp.billing', style='width: 100%' :show-header='false')
              el-table-column(type="index" label='Date', width='20')
              el-table-column(prop='billing', label='billing')
              el-table-column(align='left', width='200')
                template(slot-scope='scope')
                  Delete.pull-right(:data='scope.row', :action='handleDeleteBilling')
    el-button.pull-right(@click='' style='margin-left: 20px;') Match
    el-button.pull-right(@click='resetTemp') Cancel
</template>

<style lang="scss">
.matching-plus-button {
  width: 2em !important;
  height: 2em !important;
  cursor: pointer;
}

.matching-divider {
  border-color: #489bff36;
  margin-top: 20px;
}
</style>

<script>
// import { createRecord } from '@/api/static/contribution-topup-adhoc'
// import { fetchList as fetchCompany } from '@/api/company'
import rules from './validation-rules'

export default {
  data() {
    return {
      tableData: [],
      tableHeader: [],
      listLoading: true,
      companyOptions: [],
      groupOptions: [],
      memberOptions: [],
      suspend: 'Suspend 1',
      billing: 'Billing 1',
      temp: {
        suspend: [],
        billing: []
      },
      rules
    }
  },
  created() {
    this.resetTemp()
    // fetchCompany().then(res => {
    //   res = res.filter(item => item.status === 'active')
    //   this.companyOptions = res.map(item => ({ value: item.id, label: item.name }))
    // })
  },
  methods: {
    handleDeleteSuspend({ suspend }) {
      this.temp.suspend = this.temp.suspend.filter(item => item.suspend !== suspend)
    },
    handleAddSuspend() {
      if (this.temp.suspend.findIndex(item => item.suspend === this.suspend) === -1) { this.temp.suspend.push({ suspend: this.suspend }) }
    },
    handleDeleteBilling({ billing }) {
      this.temp.billing = this.temp.billing.filter(item => item.billing !== billing)
    },
    handleAddBilling() {
      if (this.temp.billing.findIndex(item => item.billing === this.billing) === -1) { this.temp.billing.push({ billing: this.billing }) }
    },
    resetTemp() {
      this.temp = {
        suspend: [],
        billing: []
      }
    }
    // requestApproval() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       createRecord(this.temp).then((response) => {
    //         if (response.status_code >= 200 && response.status_code <= 300) {
    //           approveRecord(this.temp).then(response => {
    //             if (response.status_code >= 200 && response.status_code <= 300) {
    //               this.successNotifier()
    //             }
    //             this.$router.push({ name: 'ContributionBilling' })
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>


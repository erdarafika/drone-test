<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="() => { $router.push({name: 'FinanceAdminSuspense'}) }")
  el-tabs(type='border-card')
    el-row(:gutter="12")
      el-col
        el-button.pull-right(@click='requestMatching' class="el-button--success" style='margin-left: 20px;') Match
        el-button.pull-right(class="el-button--danger" @click='resetTemp') Cancel
    el-row(:gutter='12' style="margin-top: 10px;")
      el-col(:span='12')
        el-card(shadow='never')
          el-select(v-model='suspenseId' name="suspenseId" placeholder='Select Suspense' filterable)
            el-option(v-for="item in suspenseOptions", :key="item.value", :label="item.label", :value="item.value")
          svg-icon.pull-right.matching-plus-button(icon-class='plus' @click='handleAddSuspend')
          hr.matching-divider
          el-table(:data='temp.suspenses', style='width: 100%' :show-header='false')
            el-table-column(type="index" label='Date', width='20')
            el-table-column(prop='label', label='suspenseId')
            el-table-column(align='left', width='200')
              template(slot-scope='scope')
                Delete.pull-right(:data='scope.row', :action='handleDeleteSuspend')
      el-col(:span='12')
        el-card(shadow='never')
          el-select(v-model='billingId' name="billingId" placeholder='Select Billing' filterable)
            el-option(v-for="item in billingOptions", :key="item.value", :label="item.label", :value="item.value")
          svg-icon.pull-right.matching-plus-button(icon-class='plus' @click='handleAddBilling')
          hr.matching-divider
          el-table(:data='temp.billings', style='width: 100%' :show-header='false')
            el-table-column(type="index" label='Date', width='20')
            el-table-column(prop='label', label='billingId')
            el-table-column(align='left', width='200')
              template(slot-scope='scope')
                Delete.pull-right(:data='scope.row', :action='handleDeleteBilling')
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
import { fetchList as fetchAllSuspenses, fetchById, matchingSuspense } from '@/api/admin-suspense'
import { fetchList as fetchAllBillings, fetchBillingDetail } from '@/api/contribution-billing'

export default {
  data() {
    return {
      tableData: [],
      tableHeader: [],
      listLoading: true,
      memberOptions: [],
      suspenseOptions: [],
      billingOptions: [],
      suspenseId: undefined,
      billingId: undefined,
      temp: {
        suspenses: [],
        billings: []
      }
    }
  },
  created() {
    this.resetTemp()
    if ('id' in this.$route.query) {
      this.suspenseId = this.$route.query.id
      this.getSuspense()
      this.suspenseId = undefined
    }
    fetchAllSuspenses().then(res => {
      res = res.filter(item => item.status === 'active')
      this.suspenseOptions = res.map(item => ({ value: item.id, label: item.dplkBank.accountName + ' - ' + item.dplkBank.bank.bankName + ' - Rp ' + this.IDR(item.amount) }))
    })
    fetchAllBillings().then(response => {
      response = response.filter(item => item.status === 'active')
      this.billingOptions = response.map(item => ({ value: item.id, label: item.billingNumber + ' - Rp ' + this.IDR(item.amount) }))
    })
  },
  methods: {
    back() {
      this.$router.push({ name: 'FinanceAdminSuspense' })
    },
    handleDeleteSuspend({ suspenseId }) {
      this.temp.suspenses = this.temp.suspenses.filter(item => item.suspenseId !== suspenseId)
    },
    handleAddSuspend() {
      if (this.temp.suspenses.findIndex(item => item.suspenseId === this.suspenseId) === -1) { this.getSuspense() }
    },
    handleDeleteBilling({ billingId }) {
      this.temp.billings = this.temp.billings.filter(item => item.billingId !== billingId)
    },
    handleAddBilling() {
      if (this.temp.billings.findIndex(item => item.billingId === this.billingId) === -1) { this.getBilling() }
    },
    getSuspense() {
      fetchById(this.suspenseId).then(response => {
        this.temp.suspenses.push({ suspenseId: response.id, label: response.dplkBank.accountName + ' - ' + response.dplkBank.bank.bankName + ' - Rp ' + this.IDR(response.amount) })
      })
    },
    getBilling() {
      fetchBillingDetail(this.billingId).then(response => {
        this.temp.billings.push({ billingId: response.id, label: response.billingNumber + ' - Rp ' + this.IDR(response.amount) })
      })
    },
    resetTemp() {
      this.temp = {
        suspenses: [],
        billings: []
      }
    },
    requestMatching() {
      const request = {
        billingsId: this.temp.billings.map(item => (item.billingId)),
        suspensesId: this.temp.suspenses.map(item => (item.suspenseId))
      }
      matchingSuspense(request).then(response => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.back()
        }
      })
    }
  }
}
</script>


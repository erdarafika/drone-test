<template lang="pug">
app-container(:show="!objectId")
  template(v-slot:header-left)
    Back(:action="() => { $router.push({name: 'ContributionBilling'}) }")
  el-tabs(type="border-card")
    el-row
      el-col
        h2(style="font-weight: lighter;") {{ $t('billing.detailBilling') }}
    el-row(:gutter="40")
      el-col(:span="12")
        el-table(:data="tableDetailBillingLeft" stripe)
          el-table-column(prop="label" class-name="has-text-weight-bold")
          el-table-column(prop="value")
      el-col(:span="12")
        el-table(:data="tableDetailBillingRight" stripe)
          el-table-column(prop="label" class-name="has-text-weight-bold")
          el-table-column(prop="value")
    el-row(v-if="billingDetail.length > 0")
      el-col
        h2(style="font-weight: lighter;") {{ $t('billing.memberDetail') }}
          el-button(v-if="expand === false" style='margin-left: 10px;float:right', type='primary', size="small" @click="handleExpand") {{ $t('table.expand') }}
          el-button(v-else style='margin-left: 10px;float:right', type='primary', size="small" @click="handleHide") {{ $t('table.hide') }}
    el-row(:gutter="40" v-if="billingDetail.length > 0")
      el-col
        el-table(:key="tableKey" :data="billingDetail" stripe v-if="expand === true")
          el-table-column(:label="$t('billingDetail.memberId')", align='left')
            template(slot-scope="scope")
              span(v-if="scope.row.member !== undefined")
                el-button(type="text" @click="goToMember(scope.row.member)") {{ scope.row.member.name }}
          el-table-column(:label="$t('billingDetail.employee')")
            template(slot-scope="scope")
              span {{ IDR(scope.row.employee) }}
          el-table-column(:label="$t('billingDetail.employer')")
            template(slot-scope="scope")
              span {{ IDR(scope.row.employer) }}
          el-table-column(:label="$t('billingDetail.topupEE')")
            template(slot-scope="scope")
              span {{ IDR(scope.row.topupEE) }}
          el-table-column(:label="$t('billingDetail.topupER')")
            template(slot-scope="scope")
              span {{ IDR(scope.row.topupER) }}
          el-table-column(:label="$t('billingDetail.totalAmount')")
            template(slot-scope="scope")
              span {{ IDR(scope.row.totalAmount) }}
    el-row(:gutter="40")
      el-col(:span="12").pull-right
        el-table(:data="totalAmount")
          el-table-column(prop="label" class-name="has-text-weight-bold totalAmount")
          el-table-column(prop="value" class-name="totalAmount")
</template>

<style>
.has-text-weight-bold {
  font-weight: bold;
}
.totalAmount {
  background-color: #f5f7fa;
}
</style>

<script>
import { fetchBillingDetail, fetchBillingDetails } from '@/api/contribution-billing'
export default {
  name: 'ContributionBillingDetail',
  // eslint-disable-next-line vue/require-prop-types
  props: ['objectId'],
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      dialogStatus: 'detail',
      tableDetailBillingLeft: [],
      tableDetailBillingRight: [],
      totalAmount: [],
      billingDetail: [],
      expand: false,
      temp: {
        id: undefined
      }
    }
  },
  created() {
    this.dialogStatus = this.$route.params.action
    if (this.objectId) {
      this.temp.id = this.objectId
      this.getRecord()
    } else {
      if ('id' in this.$route.query) {
        this.temp.id = this.$route.query.id
        this.getRecord()
      }
    }
  },
  methods: {
    handleExpand() {
      this.expand = true
    },
    handleHide() {
      this.expand = false
    },
    getRecord() {
      fetchBillingDetail(this.temp.id).then(response => {
        this.totalAmount = [
          {
            label: this.$t('table.total'),
            value: 'IDR ' + this.IDR(response.amount)
          }
        ]
        this.tableDetailBillingLeft = [
          {
            label: this.$t('billing.billingNumber'),
            value: response.billingNumber
          },
          {
            label: this.$t('billing.billingDate'),
            value: this.$moment(Date.parse(response.billingDate)).format('Do MMMM, YYYY')
          },
          {
            label: this.$t('billing.companyId'),
            value: response.group.company.name
          }
        ]
        this.tableDetailBillingRight = [
          {
            label: this.$t('billing.totalAmount'),
            value: 'IDR ' + this.IDR(response.amount)
          },
          {
            label: this.$t('billing.totalMember'),
            value: response.totalMember
          },
          {
            label: this.$t('billing.status'),
            value: response.status
          }
        ]
        if (response.billingType !== 'dplk-ppukp') {
          fetchBillingDetails(this.temp.id).then(response => {
            this.billingDetail = response
          })
        }
      })
    },
    goToMember(member) {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'detail' }, query: { id: member.id }})
    }
  }
}
</script>

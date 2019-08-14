<template lang="pug">
app-container
  .table-header
    el-row
      el-col(:span='20')
        h2.title  List Of Billing
      el-col(:span='4')
        el-select(placeholder='Add Billing' v-model='temp.billingType', :default-first-option='true', filterable, @change='handleCreate($event)', ref="billingTypeRef")
          el-option(v-for='item in listBillingOptions', :key='item.value', :label='item.label', :value='item.value')
  .complex-filter-container
    .complex-filter-item
      .title | {{ $t('table.filter') }}
      el-form(label-position='left')
        el-form-item(:label="$t('table.status')")
          el-radio-group(v-model='listQuery.status')
            el-radio(v-for='option in statusOptions'  :key='option.value' :label='option.value') {{ option.label }}
      el-form(:inline='true')
        el-form-item(:label="$t('billing.billingNumber')")
          el-input.filter-item(v-model='listQuery.billingNumber', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('billing.billingName')")
          el-input.filter-item(v-model='listQuery.billingName', prefix-icon='el-icon-search', style='width: 200px;')
        el-form-item(:label="$t('billing.groupId')")
          el-select(placeholder='Select' v-model='listQuery.group' name='groupId')
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('billing.billingNumber')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.billingNumber }}
    el-table-column(:label="`Billing Name`", align='left')
      template(slot-scope='scope')
        span(v-if="scope.row.billingType === 'dplk-individual' || scope.row.billingType === 'adhoc-topup-individual'") {{ scope.row.billingName }}
        span(v-else) {{ scope.row.group.name }}
    el-table-column(:label="`Billing Type`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.billingType }}
    el-table-column(:label="`Status`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<script>
import { fetchList, fetchBillingDetails } from '@/api/contribution-billing'
import { fetchGroupMaintanance as fetchGroupById, fetchList as fetchGroup } from '@/api/group-maintenance'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      groupOptions: [],
      listBillingOptions: [
        { label: 'Billing PPUKP', value: 'dplk-ppukp' },
        { label: 'Billing PPIP Individual', value: 'dplk-individual' },
        { label: 'Billing PPIP Organization', value: 'dplk' }
      ],
      statusOptions: [
        { label: 'Show All', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Terminated', value: 'terminated' }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        group: undefined,
        billingNumber: undefined,
        billingName: undefined,
        billingType: undefined
      },
      temp: {
        billingType: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { status, group, billingNumber, billingName, billingType, limit, page } = this.listQuery
      let listAfterSearch = this.list
      listAfterSearch = listAfterSearch.filter(data => !group || data.group.name.toLowerCase().includes(group.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !status || String(data.status).toLowerCase().includes(status.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !billingNumber || String(data.billingNumber).toLowerCase().includes(billingNumber.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !billingName || String(data.billingName).toLowerCase().includes(billingName.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !billingType || String(data.billingType).toLowerCase().includes(billingType.toLowerCase()))

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    fetchGroup().then(res => {
      this.groupOptions = res.map(group => ({ value: group.name, label: group.name }))
    })
    this.getList()
  },
  methods: {
    handleCreate(event) {
      switch (event) {
        case 'dplk-ppukp':
          this.$router.push({ name: 'ContributionBillingPPUKP', params: { action: 'create' }})
          break
        case 'dplk':
          break
        case 'dplk-individual':
          break
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        response.forEach(function(data) {
          if (Number.isInteger(data.group)) {
            fetchGroupById(data.group).then(group => {
              data.group = group
            })
          }
          if (data.billingType === 'dplk-individual' || data.billingType === 'adhoc-topup-individual') {
            fetchBillingDetails(data.id).then(details => {
              if (details.length) {
                data.billingName = details[0].member.name
              }
            })
          } else {
            data.billingName = data.group.name
          }
        })
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    }
  }
}
</script>

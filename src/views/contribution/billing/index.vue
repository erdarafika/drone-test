<template lang="pug">
app-container
  //.filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
  .table-header
    el-row
      el-col(:span='20')
        h2.title  List Of Billing
      el-col(:span='4')
        el-select(placeholder='Add Billing' v-model='listQuery.group' name='groupId')
          el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
  .complex-filter-container
    .complex-filter-item
      .title | {{ $t('table.filter') }}
      el-form(label-position='left')
        el-form-item(:label="$t('table.status')")
          el-radio-group(v-model='listQuery.status')
            el-radio(v-for='option in statusOptions'  :key='option.value' :label='option.value') {{ option.label }}
      el-form(:inline='true')
        el-form-item(:label="$t('membership.name')")
          el-input.filter-item(v-model='listQuery.name', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('membership.certificateNumber')")
          el-input.filter-item(v-model='listQuery.certificateNumber', prefix-icon='el-icon-search', style='width: 200px;')
        el-form-item(:label="$t('membership.groupId')")
          el-select(placeholder='Select' v-model='listQuery.group' name='groupId')
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('billing.billingNumber')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.billingNumber }}
    el-table-column(:label="`Billing Name`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.billingName }}
    el-table-column(:label="`Billing Type`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
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
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        if (response.billingType === 'dplk-ppukp' || response.billingType === 'dplk' || response.billingType === 'adhoc-topup-individual') {
          this.list.billingName = response.group.name
        } else if (response.billingType === 'dplk-individual' || response.billingType === 'adhoc-topup-individual') {
          fetchBillingDetails().then(details => {
            this.list.billingName = details
          })
        }
        this.total = response.length
        this.listLoading = false
      })
    }
  }
}
</script>

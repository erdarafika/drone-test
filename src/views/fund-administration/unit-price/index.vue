
<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;',)
    el-date-picker.filter-item(v-model='listQuery.date', type='date', placeholder='Pick a day' style='margin-left:  30px;')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('unitPrice.fundName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.investmentType.name }}
    el-table-column(:label="$t('unitPrice.price')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.price }}
    el-table-column(:label="$t('unitPrice.status')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('unitPrice.effectiveDate')", align='left' width="150")
      template(slot-scope='scope')
        span {{ scope.row.effectiveDate | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="$t('table.createdDate')", align='left' width="150")
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList as fetchInvestmentTypeList, fetchUnitPriceList } from '@/api/investment-type'
export default {
  name: 'UnitPrice',
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
        q: undefined,
        date: undefined
      },
      investmentTypeOptions: []
    }
  },
  computed: {
    filterredList() {
      const dateFormat = 'Do MMMM YYYY'
      const { q, limit, page, date } = this.listQuery
      const formattedDate = date ? this.$moment(date).format(dateFormat) : date

      let listAfterSearch = this.list.filter(data => !q || data.investmentType.name.toLowerCase().includes(q.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !date || this.$moment(data.effectiveDate).format(dateFormat) === formattedDate)
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    fetchInvestmentTypeList().then(response => {
      this.investmentTypeOptions = response.data.items.map(i => ({ label: i.name, value: i.id }))
    })
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUnitPriceList().then(response => {
        console.log(response)

        this.list = response
        this.total = response.length
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      if (this.listQuery.date) { this.listQuery.date = this.$moment(this.listQuery.date).format('YYYY-MM-DD') }
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

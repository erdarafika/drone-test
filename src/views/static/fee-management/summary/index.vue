<template lang="pug">
app-container
  .filter-container
    el-date-picker(v-model='listQuery.start', type='date', placeholder='Start at' :editable='false')
    el-date-picker(v-model='listQuery.end', type='date', placeholder='End at' :editable='false' style='margin-left:20px;')

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('feeSummary.feeType')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('feeSummary.totalTransaction')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.totalTransaction }}
    el-table-column(:label="$t('feeSummary.totalFee')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.totalFee }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<script>
import { fetchList } from '@/api/static/fee-management-summary'
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
        start: undefined,
        end: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { start, end, limit, page } = this.listQuery
      // const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      let listAfterSearch = this.list
      if (end) {
        listAfterSearch = listAfterSearch.filter(item => this.$moment(end).isSameOrAfter(this.$moment(item.created_at)))
      }
      if (start) {
        listAfterSearch = listAfterSearch.filter(item => this.$moment(start).isSameOrBefore(this.$moment(item.created_at)))
      }

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
        this.total = response.length
        this.listLoading = false
      })
    }
  }
}
</script>

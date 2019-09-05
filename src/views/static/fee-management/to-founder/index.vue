<template lang="pug">
app-container
  el-form(:inline='true')
    el-form-item(:label="$t('')")
      el-input.filter-item(placeholder="Search by Year" v-model='listQuery.period', prefix-icon='el-icon-search' style='width: 200px;')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('tofounder.period')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.period | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="$t('tofounder.money')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.money }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<script>
import { fetchList } from '@/api/static/fee-management-to-founder'
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
        limit: 20
      }
    }
  },
  computed: {
    filterredList() {
      const { limit, page } = this.listQuery
      const listAfterSearch = this.list
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

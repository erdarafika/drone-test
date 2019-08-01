<template lang="pug">
app-container

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="`Transaction Date`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.transactionDate | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="`Description`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.description }}
    el-table-column(:label="`Money Source`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.moneySource }}
    el-table-column(align='left')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<script>
import { fetchList } from '@/api/static/fee-management-list'
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
    handleDetail(data) {
      console.log(data)
    },
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

<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('taskManagement.taskType')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.taskType }}
    el-table-column(:label="$t('taskManagement.description')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.description }}
    el-table-column(:label="$t('taskManagement.issuer')", align='left', width='190')
      template(slot-scope='scope')
        span {{ scope.row.issuer.username }}
    el-table-column(:label="$t('taskManagement.status')", align='left', width='190')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding', width='88')
      template(slot-scope='{row}')
          Approve(:data='row' :callback='handleApprove')
    el-table-column(label='', align='right', class-name='small-padding', width='88')
      template(slot-scope='{row}')
          Reject(:data='row' :callback='handleReject')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
</template>

<script>
import { fetchList, approveTask, rejectTask } from '@/api/task-management'
import Pagination from '@/components/Pagination'

export default {
  name: 'AddressType',
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
      const listAfterSearch = this.list.filter(
        data => !q ||
          data.taskType.toLowerCase().includes(q.toLowerCase()) ||
          data.issuer.toLowerCase().includes(q.toLowerCase())
      )
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
        this.list = response.filter(item => item.status !== 'approved')
        this.total = response.length
        this.listLoading = false
      })
    },
    handleApprove(row) {
      approveTask(row.id).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    handleReject(row) {
      rejectTask(row.id).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    }
  }
}
</script>

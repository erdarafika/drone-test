<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-checkbox.filter-item(v-model='listQuery.showApproved' style='margin-left:20px') {{ $t('taskManagement.showApproved') }}
    el-checkbox.filter-item(v-model='listQuery.showRejected' style='margin-left:20px') {{ $t('taskManagement.showRejected') }}

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
    el-table-column(label='', align='right', class-name='small-padding')
      template(slot-scope='{row}')
          Detail(:data='row' :action='handleDetail')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
</template>

<script>
import { fetchList } from '@/api/task-management'
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
        q: undefined,
        showApproved: false,
        showRejected: false
      }
    }
  },
  computed: {
    filterredList() {
      const { q, showRejected, showApproved, limit, page } = this.listQuery
      let listAfterSearch = this.list.filter(
        data => !q ||
          data.taskType.toLowerCase().includes(q.toLowerCase()) ||
          data.issuer.username.toLowerCase().includes(q.toLowerCase()))
      if (!showRejected) { listAfterSearch = listAfterSearch.filter(data => data.status !== 'rejected') }
      if (!showApproved) { listAfterSearch = listAfterSearch.filter(data => data.status !== 'approved') }
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleDetail(row) {
      this.$router.push({ name: 'TaskDetail', params: { action: 'detail' }, query: { id: row.id, objectId: row.objectId }})
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

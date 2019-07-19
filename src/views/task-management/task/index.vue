<template lang="pug">
app-container
  el-tabs.pensiun-tab(type='border-card')
    el-tab-pane(:label='$t("route.taskManagement")')
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
          el-table-column(label='', align='right', class-name='small-padding')
            template(slot-scope='{row}')
                Detail(:data='row' :action='handleDetail')
      pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
    el-tab-pane(:label='$t("table.history")')
      .filter-container
        el-input.filter-item(v-model='listQuery.qHistory', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
        el-checkbox.filter-item(v-model='listQuery.showApproved' style='margin-left:20px') {{ $t('taskManagement.showApproved') }}
        el-checkbox.filter-item(v-model='listQuery.showRejected' style='margin-left:20px') {{ $t('taskManagement.showRejected') }}
      el-table(:key='tableKey', v-loading='listLoading', :data='filterredHistoryList', fit='', highlight-current-row='', style='width: 100%;')
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
      pagination(v-show='totalHistory>0', :total='totalHistory', :page.sync='listQuery.pageHistory', :limit.sync='listQuery.limitHistory')

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
      listHistory: [],
      total: 0,
      totalHistory: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageHistory: 1,
        limitHistory: 20,
        limit: 20,
        q: undefined,
        qHistory: undefined,
        showApproved: true,
        showRejected: true
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(
        data => !q ||
          data.taskType.toLowerCase().includes(q.toLowerCase()) ||
          data.issuer.username.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    filterredHistoryList() {
      const { qHistory, showRejected, showApproved, limitHistory, pageHistory } = this.listQuery
      let listAfterSearch = this.listHistory.filter(
        data => !qHistory ||
          data.taskType.toLowerCase().includes(qHistory.toLowerCase()) ||
          data.issuer.username.toLowerCase().includes(qHistory.toLowerCase()))
      if (!showRejected) { listAfterSearch = listAfterSearch.filter(data => data.status !== 'rejected') }
      if (!showApproved) { listAfterSearch = listAfterSearch.filter(data => data.status !== 'approved') }
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limitHistory * pageHistory && index >= limitHistory * (pageHistory - 1))
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
        this.list = response.filter(item => { return item.status !== 'approved' && item.status !== 'rejected' })
        this.total = this.list.length
        this.listHistory = response.filter(item => { return item.status === 'approved' || item.status === 'rejected' })
        this.totalHistory = this.listHistory.length
        console.log(this.listHistory)

        this.listLoading = false
      })
    }
  }
}
</script>

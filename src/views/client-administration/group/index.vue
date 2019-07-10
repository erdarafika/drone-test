<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('groupMaintenance.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('groupMaintenance.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('groupMaintenance.productType')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.productType.name }}
    el-table-column(:label="$t('groupMaintenance.status')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
        Edit(:data='row' :action='handleUpdate')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
</template>

<style>
.multi-form {
  padding: 10px;
}
.pane .el-tab-pane {
  padding: 15px;
  padding-left: 20px;
}

.company-information-form .el-form-item--medium .el-form-item__label {
  line-height: 10px !important;
}
</style>

<script>
import { fetchList } from '@/api/group-maintenance'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Company',
  components: { Pagination },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
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
    handleUpdate(row) {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'update' }, query: { id: row.id }})
    },
    handleDetail(row) {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'create' }})
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

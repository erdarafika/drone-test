<template lang="pug">
app-container
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('feeList.transactionData')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="$t('feeList.description')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('feeList.moneySource')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(align='left')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  //el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('feeList.transactionDate')", prop='transactionDate')
        el-input(v-model='temp.transactionDate', name='transactionDate' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' )
      el-form-item(:label="$t('feeList.description')", prop='description')
        el-input(v-model='temp.description', name='description' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' )
      el-form-item(:label="$t('feeList.moneySource')", prop='moneySource')
        el-input(v-model='temp.moneySource', name='moneySource' type='textarea', :autosize='{ minRows: 4, maxRows: 4}' )
    .dialog-footer(slot='footer')
</template>

<script>
import { fetchList } from '@/api/fee-management-list'
import Pagination from '@/components/Pagination'
import Todo from '../../dashboard/admin/components/TodoList/Todo'

export default {
  name: 'FeeList',
  components: { Todo, Pagination },
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
    handleDetail(row) {
      this.$router.push({ name: 'FeeListDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'create' }})
    },
    handleUpdate(row) {
      this.$router.push({ name: 'MemberMaintenanceDetail', params: { action: 'update' }, query: { id: row.id }})
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

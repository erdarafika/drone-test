<template lang="pug">
app-container
  .complex-filter-container
    .complex-filter-item
      .title | {{ $t('table.filter') }}
      el-form(:inline='true')
        el-form-item(:label="$t('logUser.accessTime')")
          el-date-picker.filter-item(:value-format='dateFormat' v-model='listQuery.accessTime' type="date", placeholder='Pick a date', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('logUser.userId')")
          el-input.filter-item(v-model='listQuery.username', prefix-icon='el-icon-search', style='width: 200px;')
  el-table(:key="tableKey" v-loading="listLoading" :data="filteredList" fit="" highlight-current-row="" style="width: 100%")
    el-table-column(:label="$t('logUser.accessTime')" align="left")
      template(slot-scope="scope")
        span {{ scope.row.accessTime | moment("Do MMMM, YYYY HH:mm:ss") }}
    el-table-column(:label="$t('logUser.ipSource')" align="left")
      template(slot-scope="scope")
        span {{ scope.row.ipSource }}
    el-table-column(:label="$t('logUser.activity')" align="left")
      template(slot-scope="scope")
        span {{ scope.row.activity }}
    el-table-column(:label="$t('logUser.userId')" align="left")
      template(slot-scope="scope")
        span {{ scope.row.user.username }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
</template>

<script>
import { fetchList } from '@/api/log-user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'LogUser',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      listLoading: true,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        accessTime: undefined,
        username: undefined
      }
    }
  },
  computed: {
    filteredList() {
      const { accessTime, username, limit, page } = this.listQuery
      let listAfterSearch = this.list
      listAfterSearch = listAfterSearch.filter(data => !accessTime || String(this.reFormatDate(data.accessTime)).toLowerCase().includes(accessTime.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !username || String(data.user.username).toLowerCase().includes(username.toLowerCase()))

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleDetail(row) {
      console.log('Under maintenance')
      // this.$router.push({ name: 'CompanyDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    reFormatDate(date) {
      if (!date) { return null }
      return this.$moment(date).format(this.momentDateFormat)
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

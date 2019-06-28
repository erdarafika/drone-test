
  <template lang="pug">
  .app-container
    //- .filter-container
    //-   el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')

    el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('moneySource.name')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.name }}
      el-table-column(:label="$t('moneySource.code')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.code }}
      el-table-column(:label="$t('table.createdDate')", align='left', width='200')
        template(slot-scope='scope')
          | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  </template>

<script>
import { fetchList } from '@/api/money-source'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MoneySource',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

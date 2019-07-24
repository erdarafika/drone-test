
  <template lang="pug">
  app-container
    //- .filter-container
    //-   el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')

    el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('feeType.name')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.name }}
      //- el-table-column(:label="$t('feeType.status')", align='left', width='180')
      //-   template(slot-scope='scope')
      //-     span(:class="scope.row.status === 'enable' ? 'label-enable' : 'label-disable'")
      //-       | {{ scope.row.status }}
      //- el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      //-   template(slot-scope='scope')
      //-     | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
      el-table-column(label='', align='right' width='60')
        template(slot-scope='{row}')
          Status(:data='row' :action='handleUpdateStatus' :status='row.status === "enable"' v-crud-permission="['maker']")
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  </template>

<script>
import { fetchList, updateStatus } from '@/api/fee-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'FeeType',
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
    handleUpdateStatus(row) {
      const payload = {
        id: row.id,
        status: row.status === 'enable' ? 'disable' : 'enable'
      }
      updateStatus(payload).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.getList()
        }
        this.dialogFormVisible = false
      })
    },
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

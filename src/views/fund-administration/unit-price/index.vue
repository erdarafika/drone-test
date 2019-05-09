
    <template lang="pug">
    .app-container
      .filter-container
        el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
        el-date-picker.filter-item(v-model='listQuery.date', type='date', placeholder='Pick a day' style='margin-left:  30px;' @change='handleFilter')
      el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
        el-table-column(:label="$t('unitPrice.fundName')", align='left')
          template(slot-scope='scope')
            span {{ investmentTypeList[scope.row.investmentTypeId] }}
        el-table-column(:label="$t('unitPrice.price')", align='left' width="130")
          template(slot-scope='scope')
            span {{ scope.row.price }}
        el-table-column(:label="$t('unitPrice.status')", align='left' width="130")
          template(slot-scope='scope')
            span {{ scope.row.status }}
        el-table-column(:label="$t('unitPrice.effectiveDate')", align='left' width="150")
          template(slot-scope='scope')
            span {{ scope.row.effectiveDate | moment("Do MMMM, YYYY")  }}
        el-table-column(:label="$t('table.createdDate')", align='left' width="150")
          template(slot-scope='scope')
            | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
      pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

    </template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchInvestmentTypeList, fetchUnitPriceList } from '@/api/investment-type'
export default {
  name: 'UnitPrice',
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
        q: undefined,
        date: undefined,
        investmentTypeId: undefined
      },
      investmentTypeList: []
    }
  },
  created() {
    if ('id' in this.$route.query) { this.listQuery.investmentTypeId = this.$route.query.id }

    fetchInvestmentTypeList().then(response => {
      this.investmentTypeList = response.data.items.map(i => i.fundName)
    })
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUnitPriceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      if (this.listQuery.date) { this.listQuery.date = this.$moment(this.listQuery.date).format('YYYY-MM-DD') }
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

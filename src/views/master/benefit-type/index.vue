
  <template lang="pug">
  .app-container
    .filter-container
      el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')

    el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('benefitType.name')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.name }}
      el-table-column(:label="$t('benefitType.type')", align='left' width="150  ")
        template(slot-scope='scope')
          span {{ scope.row.type }}
      el-table-column(:label="$t('table.createdDate')", align='left' width="150")
        template(slot-scope='scope')
          | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
      el-table-column(:label="``", align='right' width="150")
        template(slot-scope='{row}')
          el-button(type='primary', size='mini', @click='handleDetail()')
            | {{ $t('table.detail') }}
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  </template>

<script>
import { fetchBenefitTypeList } from '@/api/benefit-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'BenefitType',
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
      fetchBenefitTypeList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail() {
      this.$router.push('/master/sub-benefit')
    }
  }
}
</script>

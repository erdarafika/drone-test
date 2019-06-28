
  <template lang="pug">
  .app-container
    .filter-container
      el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')

    el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('benefitType.name')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.name }}
      el-table-column(:label="$t('benefitType.type')", align='left' width="150")
        template(slot-scope='scope')
          span {{ scope.row.withdrawalType }}
      el-table-column(:label="$t('table.createdDate')", align='left' width="150")
        template(slot-scope='scope')
          | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
      //- el-table-column(:label="``", align='right' width="150")
      //-   template(slot-scope='{row}')
      //-     el-button(type='success', size='mini', @click='handleDetail()')
      //-       | {{ $t('benefitType.document') }}
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  </template>

<script>
import { fetchSubBenefitTypeList } from '@/api/benefit-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SubBenefit',
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
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    if ('id' in this.$route.query) { this.getList() }
  },
  methods: {
    getList() {
      this.listLoading = true
      const id = this.$route.query.id
      fetchSubBenefitTypeList(id).then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail() {
      this.$router.push('/master/sub-benefit-document')
    }
  }
}
</script>

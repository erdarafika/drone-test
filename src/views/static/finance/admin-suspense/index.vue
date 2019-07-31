// <template lang="pug">
// app-container
//   .filter-container
//     el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
//     el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
//       | {{ $t('table.add') }}
//   el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
//     el-table-column(:label="`DPLK Bank`", align='left')
//       template(slot-scope='scope')
//         span {{ scope.row.dplkBank }}
//     el-table-column(:label="`Amount`", align='left')
//       template(slot-scope='scope')
//         span {{ scope.row.amount }}
//     el-table-column(:label="`Outstanding`", align='left')
//       template(slot-scope='scope')
//         span {{ scope.row.outstanding }}
//     el-table-column(:label="$t('table.createdDate')", align='left', width='200')
//       template(slot-scope='scope')
//         | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
//     el-table-column(align='left', width='200')
//       template(slot-scope='scope')
//         el-button(size="small") Match
//         el-button(size="small") Refund
//   pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

// </template>

<script>
// import { fetchList } from '@/api/static/finance-admin-suspense'
// import Pagination from '@/components/Pagination'

// export default {
//   components: { Pagination },
//   data() {
//     return {
//       tableKey: 0,
//       list: [],
//       total: 0,
//       listLoading: true,
//       listQuery: {
//         page: 1,
//         limit: 20,
//         q: undefined
//       }
//     }
//   },
//   computed: {
//     filterredList() {
//       const { q, limit, page } = this.listQuery
//       const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
//       const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
//       return listAfterPagination
//     }
//   },
//   created() {
//     this.getList()
//   },
//   methods: {
//     getList() {
//       this.listLoading = true
//       fetchList().then(response => {
//         this.list = response
//         this.total = response.length
//         this.listLoading = false
//       })
//     }
//   }
// }
// </script>

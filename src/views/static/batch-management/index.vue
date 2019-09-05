<template lang="pug">
app-container
  .filter-container
    el-date-picker(v-model='listQuery.date', type='date', placeholder='Start at' :editable='false')

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(type='expand')
      template(slot-scope='{row}')
        el-form(ref='form' :model='temp' label-width='120px' label-position='left')
          el-row(:gutter='40')
            el-col(:span='12')
              el-form-item(label='Id')
                el-input()
              el-form-item(label='Task ID')
                el-input()
              el-form-item(label='Batch Date')
                el-date-picker(type='date', placeholder='Pilih Tanggal')
              el-form-item(label='Execution Date')
                el-date-picker(type='date', placeholder='Pilih Tanggal')
            el-col(:span='12')
              el-form-item(label='Duration')
                el-time-picker
              el-form-item(label='Completed At')
                el-time-picker
              el-form-item(label='Description')
                el-input()
              el-form-item(label='Error')
                el-input()

    el-table-column(:label="$t('managementBatch.type')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('managementBatch.description')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.description }}
    el-table-column(:label="$t('managementBatch.time')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.time }}
    el-table-column(:label="$t('managementBatch.status')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<script>
import { fetchList } from '@/api/static/batch-management'
import Pagination from '@/components/Pagination'

export default {
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
        date: undefined,
        end: undefined
      },
      temp: {

      }
    }
  },
  computed: {
    filterredList() {
      const { date, limit, page } = this.listQuery
      // const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      let listAfterSearch = this.list
      if (date) {
        listAfterSearch = listAfterSearch.filter(item => this.$moment(date).isSame(this.$moment(item.created_at)))
      }

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // handleExpand(row, expandedRows) {
    //   const index = this.list.findIndex(item => item.id === row.id)
    //   this.list[index].submit = !this.list[index].submit
    // },
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

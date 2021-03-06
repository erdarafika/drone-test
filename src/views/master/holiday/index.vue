
<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-row
    el-col(:span='12')
      v-calendar( :attributes='attributes' :locale='language' :columns="$screens({ default: 1, lg: 2 })" :rows="$screens({ default: 1, lg: 2 })"
  :is-expanded="$screens({ default: true, lg: true })")
    el-col(:span='12' style='padding-left:20px;')
      el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
        el-table-column(:label="$t('table.createdDate')", align='left', width='150')
          template(slot-scope='scope')
            | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
        el-table-column(:label="$t('holiday.date')", align='left', width="150")
          template(slot-scope='scope')
            span {{ scope.row.date | moment("Do MMMM, YYYY") }}
        el-table-column(:label="$t('holiday.description')", align='left')
          template(slot-scope='scope')
            | {{ scope.row.description }}
        el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
          template(slot-scope='{row}')
            Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
            //- Delete(:data='row' :action='handleDelete')
      pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('holiday.date')", prop='date')
        el-date-picker(v-model='temp.date', type='date', placeholder='Pick a day' name='date')
      el-form-item(:label="$t('holiday.description')", prop='description')
        el-input(v-model='temp.description', name='description' type='textarea', :autosize='{ minRows: 2, maxRows: 4}')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<style lang="scss">
.vc-border-gray-400 {
    border-color: #91b3dc96;
}
.vc-text-gray-800 {
    color: #1682e6;
}
.vc-text-gray-600 {
    color: #1682e6;
}
.vc-bg-blue-600 {
    background-color: #e64242;
}
</style>

<script>
import { fetchList, createHoliday, updateHoliday, deleteHoliday } from '@/api/holiday'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import rules from './validation-rules'

export default {
  name: 'Document',
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
      },
      temp: {
        date: undefined,
        description: undefined
      },
      attributes: [

      ],
      dialogFormVisible: false,
      dialogStatus: '',
      rules
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.description.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response
        this.attributes = response.map(item => {
          const itemDate = new Date(item.date)
          return {
            dates: itemDate,
            dot: true
          }
        })
        // this.attributes.dates.push(new Date())

        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        date: undefined,
        description: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp.date = this.$moment(this.temp.date).format('DD-MM-YYYY')
      this.$refs['dataForm'].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          createHoliday(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.temp.date = this.$moment(this.temp.date).format('DD-MM-YYYY')
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateHoliday(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteHoliday(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

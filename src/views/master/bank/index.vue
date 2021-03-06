
<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
    el-button.filter-item(:loading='downloadLoading', style='margin-left:10px;float:right', type='primary', @click='handleDownload' size="mini")
      | {{ $t('table.export') }} Excel

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('bank.code')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('bank.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.bankName }}
    el-table-column(:label="$t('bank.transferCode')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.transferCode }}
    el-table-column(:label="$t('bank.swiftCode')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.swiftCode }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    //- el-table-column(:label="$t('table.status')", align='left')
    //-   template(slot-scope='scope')
    //-     span(:class="scope.row.isActive ? 'label-enable' : 'label-disable'")
    //-       | {{ scope.row.isActive ? 'Active' : 'Not Active' }}
    el-table-column(label='', align='right', class-name='small-padding', width='220')
      template(slot-scope='{row}')
        Status(:data='row' :action='handleUpdateStatus' :status='row.isActive' v-crud-permission="['maker']")
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        //- Delete(:data='row' :action='handleDelete')
        Detail(:data='row' :action='handleView')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('bank.name')", prop='bankName')
        el-input(v-model='temp.bankName', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='bankName')
      el-form-item(:label="$t('bank.code')", prop='code')
        el-input(v-model='temp.code', type='input' name='code')
      el-form-item(:label="$t('bank.swiftCode')", prop='swiftCode')
        el-input(v-model='temp.swiftCode', type='input' name='swiftCode')
      el-form-item(:label="$t('bank.transferCode')", prop='transferCode')
        el-input(v-model='temp.transferCode', type='input' name='transferCode')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

  el-dialog(:title="$t('table.view')", :visible.sync='viewRecordVisible')
    ViewBank(:data="viewData" :handleDocumentDelete="handleDelete")
</template>

<script>
import { fetchList, createBank, updateBank, deleteBank, updateStatusBank } from '@/api/bank'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ViewBank from './components/view-bank/index'
import rules from './validation-rules'

export default {
  name: 'Bank',
  components: { Pagination, ViewBank },
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
        bankName: undefined,
        swiftCode: undefined,
        transferCode: undefined,
        code: undefined
      },
      viewData: null,
      dialogFormVisible: false,
      viewRecordVisible: false,
      dialogStatus: '',
      rules,
      downloadLoading: false
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.bankName.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  watch: {
    'temp.code': function(val) {
      this.temp.code = val.toUpperCase()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleUpdateStatus(row) {
      const payload = {
        id: row.id,
        isActive: !row.isActive
      }
      updateStatusBank(payload).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.getList()
        }
        this.dialogFormVisible = false
      })
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        bankName: undefined,
        swiftCode: undefined,
        transferCode: undefined,
        code: undefined
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
    handleView(row) {
      this.viewData = row
      this.viewRecordVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          createBank(this.temp).then((response) => {
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
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateBank(tempData).then((response) => {
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
        deleteBank(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const bankName = this.$t('bank.name')

        const tHeader = ['Bank Name']
        const list = this.list
        const filterVal = ['bankName']
        const data = this.formatJson(filterVal, list)

        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `exported-${this.$route.name}`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

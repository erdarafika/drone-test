
<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
    el-button.filter-item(:loading='downloadLoading', style='margin-left:10px;float:right', type='primary', @click='handleDownload' size="mini")
      | {{ $t('table.export') }} Excel

  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('bank.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('bank.codeName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.codeName }}
    el-table-column(:label="$t('bank.swiftCode')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.swiftCode }}
    el-table-column(:label="$t('bank.transferCode')", align='left', width='180')
      template(slot-scope='scope')
        span {{ scope.row.transferCode }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='140')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('table.edit') }}
        el-button(type='success', size='mini', @click='handleView(row)')
          | {{ $t('table.view') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('bank.name')", prop='name')
        el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}')
      el-form-item(:label="$t('bank.codeName')", prop='codeName')
        el-input(v-model='temp.codeName', type='input')
      el-form-item(:label="$t('bank.swiftCode')", prop='swiftCode')
        el-input(v-model.number='temp.swiftCode', type='input')
      el-form-item(:label="$t('bank.transferCode')", prop='transferCode')
        el-input(v-model.number='temp.transferCode', type='input')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

  el-dialog(:title="$t('table.view')", :visible.sync='viewRecordVisible')
    ViewBank(:data="viewData" :handleDocumentDelete="handleDelete")
</template>

<script>
import { fetchList, createBank, updateBank } from '@/api/bank'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'
import ViewBank from './components/view-bank/index'

export default {
  name: 'Bank',
  components: { Pagination, ViewBank },
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
      },
      temp: {
        id: undefined,
        name: undefined,
        swiftCode: undefined,
        transferCode: undefined,
        codeName: undefined,
        isActive: undefined,
        createdDate: undefined
      },
      viewData: null,
      dialogFormVisible: false,
      viewRecordVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'Bank name is required', trigger: 'change' }],
        swiftCode: [{ required: true, message: 'Swift code is required', trigger: 'change' }, { type: 'number', message: 'Swift code must be number' }],
        transferCode: [{ required: true, message: 'Transfer code is required', trigger: 'change' }, { type: 'number', message: 'Swift code must be number' }],
        codeName: [{ required: true, message: 'Code name is required', trigger: 'change' }]
      },
      downloadLoading: false
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
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        swiftCode: undefined,
        transferCode: undefined,
        codeName: undefined,
        isActive: undefined,
        createdDate: undefined
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createBank(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateBank(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.viewRecordVisible = false
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const bankName = this.$t('bank.name')

        const tHeader = ['Bank Name']
        const list = this.list
        const filterVal = ['name']
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
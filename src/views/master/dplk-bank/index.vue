<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('dplkBank.accountNumber')", align='left' width="150")
      template(slot-scope='scope')
        span {{ scope.row.accountNumber }}
    el-table-column(:label="$t('dplkBank.accountName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.accountName }}
    el-table-column(:label="$t('dplkBank.bankName')", align='left')
      template(slot-scope='scope')
        span {{ bankNameList[scope.row.bankId] }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='100')
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkBank.accountName')", prop='accountName')
        el-input(v-model='temp.accountName')
      el-form-item(:label="$t('dplkBank.accountNumber')", prop='accountNumber')
        el-input(v-model.number='temp.accountNumber')
      el-form-item(:label="$t('dplkBank.bankName')", prop='bankId')
        el-select(v-model='temp.bankId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in bankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkBank.bankBranch')", prop='bankBranchId')
        el-select(v-model='temp.bankBranchId', placeholder='Select', filterable, default-first-option  :disabled='(temp.bankId===undefined)')
          el-option(v-for='item in bankBranchOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkBank.bankAddress')" :disabled='(temp.bankId===undefined)')
        el-input(v-model='tempAddress' disabled)
      el-form-item(:label="$t('dplkBank.country')", prop='countryId')
        el-select(v-model='temp.countryId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in countryOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>
<style>
.switch-status {
  margin-left: 5px;
  font-size: 14px;
}
</style>

<script>
import { fetchList, createDplkBank, updateDplkBank } from '@/api/dplk-bank'
import { fetchList as fetchBank, fetchBranch } from '@/api/bank'
import { fetchCountryList as fetchCountry } from '@/api/location'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'

export default {
  name: 'DplkBank',
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
      },
      temp: {
        id: undefined,
        accountName: undefined,
        accountNumber: undefined,
        bankId: undefined,
        bankBranchId: undefined,
        countryId: undefined,
        isActive: undefined,
        createdDate: undefined
      },
      tempAddress: undefined,
      bankList: [],
      bankNameList: [],
      bankOptions: [],
      countryOptions: [],
      bankBranchOptions: [],
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        accountName: [{ required: true, message: 'Account name is required', trigger: 'blur' }],
        accountNumber: [{ required: true, message: 'Account number is required', trigger: 'blur' }, { type: 'number', message: 'Account number is required' }],
        bankId: [{ required: true, message: 'Bank is required', trigger: 'blur' }],
        bankBranchId: [{ required: true, message: 'Bank branch is required', trigger: 'blur' }],
        countryId: [{ required: true, message: 'Country is required', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'temp.bankBranchId': function(branchId) {
      if (branchId) { this.tempAddress = this.branchList[branchId].address } else { this.tempAddress = undefined }
    }
  },
  created() {
    this.getList()
    fetchBank().then(response => {
      this.bankList = response.data.items
      this.bankNameList = this.bankList.map(i => i.name)
      this.bankOptions = this.bankNameList.map((i, index) => ({ label: i, value: index }))
    })
    fetchBranch().then(response => {
      this.branchList = response.data.items
      this.bankBranchOptions = response.data.items.map((i, index) => ({ label: i.name, value: index }))
    })
    fetchCountry({ limit: 100 }).then(response => {
      const countryList = response.data.items.map(i => i.name)
      this.countryOptions = countryList.map((i, index) => ({ label: i, value: index }))
    })
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
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        accountName: undefined,
        accountNumber: undefined,
        bankId: undefined,
        bankBranchId: undefined,
        countryId: undefined,
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createDplkBank(this.temp).then(() => {
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
          updateDplkBank(tempData).then(() => {
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
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>

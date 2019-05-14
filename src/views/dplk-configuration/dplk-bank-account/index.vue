
<template lang="pug">
.app-container
  .filter-container
    //- el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')

    el-table-column(:label="$t('dplkBankAccount.name')", align='left',)
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('dplkBankAccount.number')", align='left', width="180")
      template(slot-scope='scope')
        span {{ scope.row.number }}
    el-table-column(:label="$t('dplkBankAccount.bank')", align='left',)
      template(slot-scope='scope')
        span {{ getBankName(scope.row.bankId) }}
    el-table-column(:label="$t('dplkBankAccount.bankBranch')", align='left')
      template(slot-scope='scope')
        span {{ getBankName(scope.row.bankBranchId) }}
    el-table-column(:label="$t('dplkBankAccount.bankCountry')", align='left')
      template(slot-scope='scope')
        span {{ getCountryName(scope.row.bankBranchId) }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}

    el-table-column(label='', align='right',  width='160')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)')
          | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkBankAccount.name')", prop='name')
        el-input(v-model.number='temp.name', type='input')
      el-form-item(:label="$t('dplkBankAccount.number')", prop='number')
        el-input(v-model.number='temp.number', type='input')
      el-form-item(:label="$t('dplkBankAccount.bank')", prop='bankId')
        el-select(v-model='temp.bankId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in bankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkBankAccount.bankBranch')", prop='bankBranchId')
        el-select(v-model='temp.bankBranchId', placeholder='Select', filterable, default-first-option :disabled="!temp.bankId")
          el-option(v-for='item in bankBranchOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkBankAccount, updateDplkBankAccount } from '@/api/dplk-bank-account'
import { fetchList as fetchBankList, fetchBranch } from '@/api/bank'
import { fetchCountryList } from '@/api/location'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'
import crudPermission from '@/directive/crud-permission/index.js'

export default {
  name: 'Document',
  directives: { crudPermission },
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      countryList: [],
      bankList: [],
      bankOptions: [],
      bankBranchList: [],
      bankBranchOptions: [],
      temp: {
        id: undefined,
        name: undefined,
        number: undefined,
        bankId: undefined,
        bankBranchId: undefined,
        isActive: undefined,
        createdDate: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'This field is required' }],
        number: [{ required: true, message: 'This field is required' }, { type: 'number', message: 'This field must be number' }],
        bankId: [{ required: true, message: 'This field is required' }],
        bankBranchId: [{ required: true, message: 'This field is required' }]
      }
    }
  },
  created() {
    fetchBankList().then(response => {
      this.bankList = response.data.items
      this.bankOptions = this.bankList.map((i, index) => ({ label: i.name, value: index }))
      fetchBranch().then(responseBranch => {
        this.bankBranchList = responseBranch.data.items
        this.bankBranchOptions = this.bankBranchList.map((i, index) => ({ label: i.name, value: index }))

        fetchCountryList({ page: 1, limit: 50 }).then(responseCountry => {
          this.countryList = responseCountry.data.items
          this.getList()
        })
      })
    })
  },
  methods: {
    getCountryName(branchId) {
      const branch = this.bankBranchList[branchId]

      return this.countryList[branch.countryId].name
    },
    getBankName(bankId) {
      return this.bankList[bankId].name
    },
    getBankBranchName(branchId) {
      return this.bankBranchList[branchId].name
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

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
        number: undefined,
        bankId: undefined,
        bankBranchId: undefined,
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
          createDplkBankAccount(this.temp).then(() => {
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
          updateDplkBankAccount(tempData).then(() => {
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

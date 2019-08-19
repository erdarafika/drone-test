
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')

    el-table-column(:label="$t('dplkBankAccount.name')", align='left',)
      template(slot-scope='scope')
        span {{ scope.row.accountName }}
    el-table-column(:label="$t('dplkBankAccount.number')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.accountNumber }}
    el-table-column(:label="$t('dplkBankAccount.bank')", align='left',)
      template(slot-scope='scope')
        span {{ scope.row.bank.bankName }}
    el-table-column(:label="$t('dplkBankAccount.bankBranch')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.branchName  }}
    el-table-column(:label="$t('table.createdDate')", align='left')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('table.status')", align='left')
      template(slot-scope='scope')
        span(:class="scope.row.defaultBank?'label-enable':''")
          | {{ scope.row.defaultBank? 'Default': '' }}
    el-table-column(:label="$t('table.status')", align='left')
      template(slot-scope='scope')
        span(:class="scope.row.isActive ? 'label-enable' : 'label-disable'")
          | {{ scope.row.isActive ? 'Active' : 'Not Active' }}
    el-table-column(label='', align='right' width='150')
      template(slot-scope='{row}')
        Status(:data='row' :action='handleUpdateStatus' :status='row.isActive' v-crud-permission="['maker']")
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkBankAccount.name')", prop='accountName')
        el-input(v-model.number='temp.accountName',  name='accountName' type='input')
      el-form-item(:label="$t('dplkBankAccount.number')", prop='accountNumber')
        el-input(v-model.number='temp.accountNumber', name='accountNumber' type='input')
      el-form-item(:label="$t('dplkBankAccount.bank')", prop='bankId')
        el-select(v-model='temp.bankId', name='bankId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in bankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkBankAccount.bankBranch')", prop='branchName')
        el-input(v-model.number='temp.branchName',  name='branchName' type='input')
      el-form-item(:label="$t('table.setDefault')" prop="isCompanyAddress")
        el-switch(v-model='temp.defaultBank'  name='defaultBank')
        span.switch-status {{ temp.defaultBank?'Default':'not Default' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkBankAccount, updateDplkBankAccount, deleteDplkBankAccount, updateStatusDplkBankAccount } from '@/api/dplk-bank-account'
import { fetchList as fetchBankList } from '@/api/bank'

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
        limit: 20
      },
      bankOptions: [],
      temp: {
        accountName: undefined,
        accountNumber: undefined,
        bankId: undefined,
        branchName: undefined,
        defaultBank: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.accountName.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
    fetchBankList().then(res => {
      this.bankOptions = res.map(bank => ({ value: bank.id, label: bank.bankName }))
    })
  },
  methods: {
    handleUpdateStatus(row) {
      const payload = {
        id: row.id,
        isActive: !row.isActive
      }
      updateStatusDplkBankAccount(payload).then((response) => {
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
        accountName: undefined,
        accountNumber: undefined,
        bankId: undefined,
        branchName: undefined,
        defaultBank: false
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
          createDplkBankAccount(this.temp).then((response) => {
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
      this.temp = {
        id: row.id,
        accountName: row.accountName,
        accountNumber: row.accountNumber,
        bankId: row.bank.id,
        branchName: row.branchName,
        defaultBank: row.defaultBank
      } // copy obj
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
          updateDplkBankAccount(this.temp).then((response) => {
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
        deleteDplkBankAccount(row).then((response) => {
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

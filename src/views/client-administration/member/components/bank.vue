<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(v-if="dialogStatus !== 'detail'" style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('memberBank.accountName')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.accountName }}
    el-table-column(:label="$t('memberBank.accountNumber')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.accountNumber }}
    el-table-column(:label="$t('memberBank.bankName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.bank.bankName }}
    el-table-column(:label="$t('memberBank.branchName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.branchName ? undefined : '-' }}
    el-table-column(:label="$t('memberBank.status')", align='left',)
      template(slot-scope='scope')
        span(:class="scope.row.currentBank ?'label-enable':''")
          | {{ scope.row.currentBank ? 'Default':'' }}
    el-table-column(label='', align='right', width='150' )
      template(slot-scope='{row}')
        Edit(v-if="dialogStatus !== 'detail'" :data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(v-if="dialogStatus !== 'detail'" :data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('memberBank.accountName')", prop='accountName')
        el-input(v-model.number='temp.accountName', name='accountName' type='input')
      el-form-item(:label="$t('memberBank.accountNumber')", prop='accountNumber')
        el-input(v-model.number='temp.accountNumber', name='accountNumber' type='input')
      el-form-item(:label="$t('memberBank.bankName')", prop='bankId')
        el-select(v-model='temp.bankId', name='bankId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in bankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('memberBank.branchName')", prop='branchName')
        el-input(v-model.number='temp.branchName', name='branchName' type='input')
      el-form-item(:label="$t('memberBank.status')" prop='currentBank')
        el-switch(v-model='temp.currentBank' name='currentBank')
        span.switch-status {{ temp.currentBank?'Default':'Not Default' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}
</template>

<script>
import { fetchList, createRecord, updateRecord, deleteRecord } from '@/api/member-bank'
import { fetchList as fetchBankList } from '@/api/bank'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator, alphabeticValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: 'MemberBank',
  components: { Pagination },
  props: ['data'],
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
        currentBank: false
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        bankId: [requiredValidator],
        accountName: [requiredValidator, alphabeticValidator],
        accountNumber: [requiredValidator, numberValidator],
        currentBank: [requiredValidator],
        branchName: []
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
    this.dialogStatus = this.$route.params.action
    this.getBankOptions()
    if (this.data.id) {
      this.getList()
    }
  },
  methods: {
    getBankOptions() {
      fetchBankList().then(res => {
        this.bankOptions = res.map(bank => ({ value: bank.id, label: bank.bankName }))
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
      fetchList(this.data.id).then(response => {
        this.list = response
        this.total = response.length

        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        bankId: undefined,
        accountName: undefined,
        accountNumber: undefined,
        currentBank: false
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
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp['memberId'] = this.data.id

          createRecord(this.temp).then(response => {
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
        memberId: this.data.id,
        id: row.id,
        bankId: row.bank.id,
        branchName: row.branchName,
        accountName: row.accountName,
        accountNumber: row.accountNumber,
        currentBank: row.currentBank
      }
      this.initialUpdate = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateRecord(this.temp).then(response => {
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
      row['companyId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteRecord(row).then(() => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        }).catch(error => {
          console.log(error)
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

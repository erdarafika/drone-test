<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="`DPLK Bank`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.dplkBank.accountName }} - {{ scope.row.dplkBank.bank.bankName }}
    el-table-column(:label="`Amount`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.amount }}
    el-table-column(:label="`Outstanding`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.outstanding }}
    el-table-column(:label="`Status`", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(align='left', width='200')
      template(slot-scope='scope')
        el-button(size="small" :disabled='scope.row.status !== "active"' class="el-button--success" @click="handleMatch(scope.row)") Match
        el-button(size="small" class="el-button--warning") Refund
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='`Add`', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="`DPLK Bank`", prop='dplkBankId')
        el-select(v-model='temp.dplkBankId', name='dplkBankId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in dplkBankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="`Payment Date`", prop='paymentDate' )
        el-date-picker(:value-format='dateFormat' v-model='temp.paymentDate', type='date', placeholder='Pick a day' name='date')
      el-form-item(:label="`Amount`", prop='amount')
        el-input(v-model.number='temp.amount', name='amount' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
      el-form-item(:label="`Description`", prop='description')
        el-input(v-model.number='temp.description', name='description' type='textarea', :autosize='{ minRows: 2, maxRows: 4}')
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="createData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createAdminSuspense } from '@/api/admin-suspense'
import Pagination from '@/components/Pagination'
import { fetchList as fetchDplkBankList } from '@/api/dplk-bank-account'
import rules from './validation-rules'

export default {
  components: { Pagination },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      dplkBankOptions: [],
      temp: {
        dplkBankId: undefined,
        amount: undefined,
        paymentDate: undefined,
        description: undefined
      },
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      rules
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
    fetchDplkBankList().then(res => {
      this.dplkBankOptions = res.map(item => ({ label: `${item.accountName} - ${item.bank.bankName}`, value: item.id }))
    })
    this.getList()
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createAdminSuspense(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleMatch(row) {
      this.$router.push({ name: 'FinanceMatchingSuspense', query: { id: row.id }})
    },
    resetTemp() {
      this.temp = {
        dplkBankId: undefined,
        amount: undefined,
        paymentDate: undefined
      }
    },
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

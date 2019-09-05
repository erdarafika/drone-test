<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('benefitPpip.member')", align='left' prop='member')
    el-table-column(:label="$t('benefitPpip.subBenefitType')", align='left' prop='subBenefitType')
    el-table-column(:label="$t('benefitPpip.submitDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.submitDate | moment("Do MMMM, YYYY") }}
    el-table-column(:label="`Status`", align='left' prop='status')
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='`Add`', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px')
      el-row(:gutter='40')
        el-col(:span='6')
          el-form-item(:label="`Company`", prop='company' label-width='80px')
            el-select(v-model='temp.company', name='company' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
        el-col(:span='10')
          el-form-item(:label="`Submit Date`", prop='submitDate' label-width='120px')
            el-date-picker(:value-format='dateFormat' v-model='temp.submitDate', type='date', placeholder='Pick a day' name='date')
        el-col(:span='8')
          el-form-item(:label="`Account Bank`", prop='bankAccount' label-width='120px')
            el-select(v-model='temp.bankAccount', name='bankAccount' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in bankAccountOptions', :key='item.value', :label='item.label', :value='item.value')
      hr(style='margin-bottom:20px;border-color:#ffffff54')
      el-row(:gutter='80')
        el-col(:span='12')
          el-form-item(:label="`Gross Amount`", prop='grossAmount')
            el-input(v-model='temp.grossAmount')
          el-form-item(:label="`Tax`", prop='tax')
            el-input(v-model='temp.tax')
          el-form-item(:label="`Fee`", prop='fee')
            el-input(v-model='temp.fee')

        el-col(:span='12')
          el-form-item(:label="`Net Amount`", prop='netAmount')
            el-input(v-model='temp.netAmount')
          el-form-item(:label="`Percentage`", prop='percentage')
            el-input(v-model='temp.percentage')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="createData()")
        | {{ $t('table.confirm') }}
</template>

<style lang="scss">
.fund-transfer-arrow {
  display: block;
  margin: auto;
  width: 3em !important;
  margin-top: 25px;
  height: 3em !important;
}
</style>

<script>
import { fetchList, createRecord } from '@/api/static/benefit-pension-ppip'
import Pagination from '@/components/Pagination'
import { fetchList as fetchCompany } from '@/api/company'

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
      bankAccountOptions: [{ label: 'Data 1', value: 'data 1' }],
      companyOptions: [],
      temp: {
        company: undefined,
        benefitType: undefined,
        submitDate: undefined,
        bankAccount: undefined,
        grossAmount: undefined,
        tax: undefined,
        fee: undefined,
        netAmount: undefined,
        percentage: undefined
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
      const listAfterSearch = this.list.filter(data => !q || data.member.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
    fetchCompany().then(res => {
      res = res.filter(item => item.status === 'active')
      this.companyOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRecord(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        dplkBank: undefined,
        grossAmount: undefined,
        transactionDate: undefined
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

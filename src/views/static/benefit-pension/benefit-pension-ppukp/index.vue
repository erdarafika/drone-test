<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('benefitPpukp.code')", align='left' prop='code')
    el-table-column(:label="$t('benefitPpukp.groupSource')", align='left' prop='groupSource')
    el-table-column(:label="$t('benefitPpukp.member')", align='left' prop='member')
    el-table-column(:label="$t('benefitPpukp.groupDestination')", align='left' prop='groupDestination')
    el-table-column(:label="$t('benefitPpukp.status')", align='left' prop='status')
    el-table-column(:label="$t('benefitPpukp.subBenefitType')", align='left' prop='subBenefitType')
    el-table-column(:label="$t('benefitPpukp.type')", align='left' prop='type')
    el-table-column(:label="$t('benefitPpukp.withdrawalNow')", align='left' prop='withdrawalNow')
    el-table-column(:label="$t('benefitPpukp.withdrawalAmount')", align='left' prop='withdrawalAmount')
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='`Add`', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px')
      el-row(:gutter='40')
        el-col(:span='8')
          el-form-item(:label="`Company`", prop='company')
            el-select(v-model='temp.company', name='company' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
        el-col(:span='8')
          el-form-item(:label="`Group`", prop='group')
            el-select(v-model='temp.group', name='group' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
        el-col(:span='8')
          el-form-item(:label="`Member`", prop='member')
            el-select(v-model='temp.member', name='member' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in memberOptions', :key='item.value', :label='item.label', :value='item.value')
      hr(style='margin-bottom:20px;border-color:#ffffff54')
      el-row(:gutter='40')
        el-col(:span='11')
          el-form-item(:label="`Amount`", prop='amount')
            el-input(v-model='temp.amount')
          el-form-item(:label="`Claim Benefit`", prop='claimBenefit')
            el-checkbox(v-model='temp.claimBenefit') Withdrawal Now
          el-form-item(:label="`Benefit Type`", prop='benefitType')
            el-select(v-model='temp.benefitType', name='benefitType' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in benefitTypeOptions', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(:label="`Member Bank`", prop='memberBank')
            el-select(v-model='temp.memberBank', name='memberBank' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in memberBankOptions', :key='item.value', :label='item.label', :value='item.value')
        el-col(:span='2')
          svg-icon.fund-transfer-arrow(icon-class='arrow-right')
        el-col(:span='11')
          el-form-item(:label="`Company`", prop='companyDestination')
            el-select(v-model='temp.companyDestination', name='company' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(:label="`Group`", prop='groupDestination')
            el-select(v-model='temp.groupDestination', name='group' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')

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
import { fetchList, createRecord } from '@/api/static/benefit-pension-ppukp'
import Pagination from '@/components/Pagination'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchList as fetchMember } from '@/api/static/member-maintenance'

import rules from './validation-rules'

export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      benefitTypeOptions: [{ label: 'Data 1', value: 'data 1' }],
      memberBankOptions: [{ label: 'Data 1', value: 'data 1' }],
      companyOptions: [],
      groupOptions: [],
      memberOptions: [],
      temp: {
        company: undefined,
        group: undefined,
        member: undefined,
        claimBenefit: false,
        memberBank: undefined,
        amount: undefined,
        companyDestination: undefined,
        groupDestination: undefined,
        benefitType: undefined
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
      const listAfterSearch = this.list.filter(data => !q || data.code.toLowerCase().includes(q.toLowerCase()))
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
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active')
      this.groupOptions = res.map(item => ({ value: item.id, label: item.name }))
    })
    fetchMember().then(res => {
      res = res.filter(item => item.status === 'active')
      this.memberOptions = res.map(item => ({ value: item.id, label: item.name }))
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
        amount: undefined,
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

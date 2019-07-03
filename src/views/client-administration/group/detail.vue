<template lang="pug">
app-container
  div.back-button
    el-button(size='small', @click="$router.push({name: 'GroupMaintenance'})")
      | {{$t('table.back')}}
  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(label='Information' name='Information')
      el-form.company-information-form(ref='dataForm', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='left', style='height:100%;')
          el-tab-pane(label='General')
            el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
              el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true' )
            el-form-item(:label="$t('groupMaintenance.companyId')", prop='companyId')
              el-select(placeholder='Select' v-model='temp.companyId'  :disabled='true')
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.productTypeId')", prop='productTypeId')
              el-select(placeholder='Select' v-model='temp.productTypeId'  :disabled='true')
                el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.proposalNumber')", prop='proposalNumber')
              el-input(v-model='temp.proposalNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true' )
            el-form-item(:label="$t('groupMaintenance.type')", prop='type')
              el-select(placeholder='Select' v-model='temp.type'  :disabled='true')
                el-option(v-for='item in groupTypeOptions', :key='item', :label='item', :value='item')

          el-tab-pane(label='Dates')
            el-form-item(:label="$t('groupMaintenance.proposalDate')" prop='proposalDate')
              el-date-picker(v-model='temp.proposalDate', type='date', placeholder='Pick a date'  :disabled='true')
            el-form-item(:label="$t('groupMaintenance.effectiveDate')" prop='effectiveDate')
              el-date-picker(v-model='temp.effectiveDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('groupMaintenance.caseCloseDate')" prop='caseCloseDate')
              el-date-picker(v-model='temp.caseCloseDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('groupMaintenance.terminationDate')" prop='terminationDate')
              el-date-picker(v-model='temp.terminationDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('groupMaintenance.ppkReceiveDate')" prop='ppkReceiveDate')
              el-date-picker(v-model='temp.ppkReceiveDate', type='date', placeholder='Pick a date' :disabled='true')

          el-tab-pane(label='Other')
            el-form-item(:label="$t('groupMaintenance.totalEmployee')" prop='totalEmployee')
              el-input(v-model='temp.totalEmployee', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('groupMaintenance.totalEmployeeRegistered')" prop='totalEmployeeRegistered')
              el-input(v-model='temp.totalEmployeeRegistered', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('groupMaintenance.isHavingFundOutsideDplk')" prop='isHavingFundOutsideDplk')
              el-input(v-model='temp.isHavingFundOutsideDplk', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('groupMaintenance.isTaxPaidByEmployer')" prop='isTaxPaidByEmployer')
              el-input(v-model='temp.isTaxPaidByEmployer', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('groupMaintenance.notes')" prop='notes')
              el-input(v-model='temp.notes', type='textarea', :autosize='{ minRows: 4, maxRows: 4}'  :disabled='true')

      .dialog-footer.pull-right( v-show='!dialogIsUpdate')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary' @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}

    el-tab-pane(label='Member Class Plan' name='Member Class Plan')
      ClassPlan(:data='temp')
    el-tab-pane(label='Billing Contribution' name='Billing Contribution')
      Billing(:data='temp')
    el-tab-pane(label='Investment Direction'  name='Investment Direction' :disabled='true')
    el-tab-pane(label='Group Charge'  name='Group Charge' :disabled='true')
    el-tab-pane(label='Withdrawal Rule'  name='Withdrawal Rule' :disabled='true')
    el-tab-pane(label='Agent'  name='Agent' :disabled='true')

</template>

<style>
.multi-form {
  padding: 10px;
}
.pane .el-tab-pane {
  padding: 15px;
  padding-left: 20px;
}

.company-information-form .el-form-item--medium .el-form-item__label {
  line-height: 10px !important;
}
</style>

<script>
import { fetchGroupMaintanance as fetchRecord } from '@/api/group-maintenance'
// import { fetchList as fetchCompany } from '@/api/company'
// import { fetchList as fetchProductType } from '@/api/product-type'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ClassPlan from './components/classPlan'
import Billing from './components/billing'

export default {
  name: 'Company',
  components: { Pagination, ClassPlan, Billing },
  data() {
    return {
      activeTab: 'Information',
      listLoading: true,
      companyOptions: [],
      productTypeOptions: [],
      groupTypeOptions: ['Organization', 'Individu'],
      temp: {
        id: undefined,
        isDraft: 1,
        companyId: undefined,
        productTypeId: undefined,
        name: undefined,
        proposalNumber: undefined,
        proposalDate: undefined,
        type: undefined,
        effectiveDate: undefined,
        caseCloseDate: undefined,
        terminationDate: undefined,
        ppkReceiveDate: undefined,
        totalEmployee: undefined,
        totalEmployeeRegistered: undefined,
        isHavingFundOutsideDplk: undefined,
        isTaxPaidByEmployer: undefined,
        notes: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    dialogIsUpdate() {
      return this.dialogStatus === 'update'
    }
  },
  created() {
    this.temp.id = this.$route.params.id
    this.getRecord()
    // fetchCompany().then(res => {
    //   this.companyOptions = res.map(company => ({ value: company.id, label: company.name }))
    // })
    // fetchProductType().then(res => {
    //   this.productTypeOptions = res.map(productType => ({ value: productType.id, label: productType.name }))
    // })
  },
  methods: {
    getRecord() {
      this.listLoading = true
      fetchRecord(this.temp.id).then(response => {
        this.temp = response
        this.listLoading = false
      })
    }
  }
}
</script>

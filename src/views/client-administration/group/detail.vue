<template lang="pug">
app-container
  template(v-slot:header)
    .action-button
      el-button.save(size='small' @click="createData()" v-if='!dialogIsUpdate')
        | {{ $t('table.save') }}
      RequestApproval(:callback="requestApproval")

  div.back-button
    el-button(size='small', @click="$router.push({name: 'GroupMaintenance'})")
      | {{$t('table.back')}}
  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(label='Information' name='Information')
      el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-tab-pane(label='General')
            el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
              el-input(v-model='temp.name',  name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
            el-form-item(:label="$t('groupMaintenance.companyId')", prop='companyId')
              el-select(placeholder='Select' v-model='temp.companyId'  name='companyId'  :disabled='dialogIsUpdate')
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.productTypeId')", prop='productTypeId')
              el-select(placeholder='Select' v-model='temp.productTypeId' name='productTypeId'  :disabled='dialogIsUpdate')
                el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.proposalNumber')", prop='proposalNumber')
              el-input(v-model='temp.proposalNumber',  name='proposalNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
            el-form-item(:label="$t('groupMaintenance.type')", prop='type')
              el-select(placeholder='Select' v-model='temp.type'  name='type'  :disabled='dialogIsUpdate')
                el-option(v-for='item in groupTypeOptions', :key='item', :label='item', :value='item')

          el-tab-pane(label='Dates')
            el-form-item(:label="$t('groupMaintenance.proposalDate')" prop='proposalDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.proposalDate', name='proposalDate' type='date', placeholder='Pick a date'  :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.effectiveDate')" prop='effectiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', name='effectiveDate' type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.caseCloseDate')" prop='caseCloseDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.caseCloseDate', name='caseCloseDate' type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.terminationDate')" prop='terminationDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.terminationDate', name='terminationDate' type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.ppkReceiveDate')" prop='ppkReceiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.ppkReceiveDate', name='ppkReceiveDate' type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')

          el-tab-pane(label='Other')
            el-form-item(:label="$t('groupMaintenance.totalEmployee')" prop='totalEmployee')
              el-input(v-model='temp.totalEmployee', name='totalEmployee' type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.totalEmployeeRegistered')" prop='totalEmployeeRegistered')
              el-input(v-model='temp.totalEmployeeRegistered', name='totalEmployeeRegistered' type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
            el-form-item(:label="$t('groupMaintenance.isHavingFundOutsideDplk')" prop='isHavingFundOutsideDplk')
              el-switch(v-model='temp.isHavingFundOutsideDplk'  name='isHavingFundOutsideDplk')
              span.switch-status {{ temp.isHavingFundOutsideDplk?'Yes':'No' }}
            el-form-item(:label="$t('groupMaintenance.isTaxPaidByEmployer')" prop='isTaxPaidByEmployer')
              el-switch(v-model='temp.isTaxPaidByEmployer' name='isTaxPaidByEmployer')
              span.switch-status {{ temp.isTaxPaidByEmployer?'Yes':'No' }}
            el-form-item(:label="$t('groupMaintenance.notes')" prop='notes')
              el-input(v-model='temp.notes', name='notes' type='textarea', :autosize='{ minRows: 4, maxRows: 4}'  :disabled='dialogIsUpdate')

      .dialog-footer.pull-right(v-show='!dialogIsUpdate' style='margin-top:-20px' v-if='!dialogIsUpdate')
        el-button(type='primary' @click="createData()")
          | {{ $t('table.confirm') }}

    el-tab-pane(label='Member Class Plan' name='Member Class Plan' :disabled='!dialogIsUpdate')
      ClassPlan(:data='temp')
    el-tab-pane(label='Billing Contribution' name='Billing Contribution'  :disabled='!dialogIsUpdate')
      Billing(:data='temp')
    el-tab-pane(label='Investment Direction'  name='Investment Direction' :disabled='!dialogIsUpdate')
    el-tab-pane(label='Group Charge'  name='Group Charge'  :disabled='!dialogIsUpdate')
    el-tab-pane(label='Withdrawal Rule'  name='Withdrawal Rule'  :disabled='!dialogIsUpdate')
    el-tab-pane(label='Agent'  name='Agent' :disabled='!dialogIsUpdate')
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
import { fetchGroupMaintanance as fetchRecord, createGroupMaintanance } from '@/api/group-maintenance'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchProductType } from '@/api/product-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ClassPlan from './components/classPlan'
import Billing from './components/billing'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Company',
  components: { Pagination, ClassPlan, Billing },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
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
      },
      dialogStatus: 'create',
      rules: {
        isDraft: [requiredValidator],
        companyId: [],
        productTypeId: [requiredValidator],
        name: [requiredValidator],
        proposalNumber: [],
        proposalDate: [],
        type: [],
        effectiveDate: [],
        caseCloseDate: [],
        terminationDate: [],
        ppkReceiveDate: [],
        totalEmployee: [],
        totalEmployeeRegistered: [],
        isHavingFundOutsideDplk: [],
        isTaxPaidByEmployer: [],
        notes: []
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
    this.resetTemp()
    this.dialogStatus = this.$route.params.action
    if ('id' in this.$route.query) {
      this.temp.id = this.$route.query.id
      this.getRecord()
    }
    fetchCompany().then(res => {
      this.companyOptions = res.map(company => ({ value: company.id, label: company.name }))
    })
    fetchProductType().then(res => {
      this.productTypeOptions = res.map(productType => ({ value: productType.id, label: productType.name }))
    })
  },
  methods: {
    requestApproval() {
      console.log('Request Approval')
    },
    reFormatDate(date) {
      return this.$moment(date).format(this.momentDateFormat)
    },
    getRecord() {
      this.listLoading = true
      fetchRecord(this.temp.id).then(response => {
        response.proposalDate = this.reFormatDate(response.proposalDate)
        response.effectiveDate = this.reFormatDate(response.effectiveDate)
        response.caseCloseDate = this.reFormatDate(response.caseCloseDate)
        response.terminationDate = this.reFormatDate(response.terminationDate)
        response.ppkReceiveDate = this.reFormatDate(response.ppkReceiveDate)
        response.companyId = response.company.id
        response.productTypeId = response.productType.id

        this.temp = response
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
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
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createGroupMaintanance(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'update' }, query: { id: response.id }})
            }
          })
        }
      })
    }
  }
}
</script>

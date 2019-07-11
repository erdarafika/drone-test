<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'GroupMaintenance'}) }")
  template(v-slot:header)
    .action-button(v-if='!dialogIsDetail')
      el-button.save(size='small' @click="dialogNotCreate ? updateData() : createData()")
        | {{ $t('table.save') }}
      RequestApproval(:callback="requestApproval")
  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(label='Information' name='Information')
      el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-tab-pane(label='General')
            el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
              el-input(v-model='temp.name',  name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('groupMaintenance.companyId')", prop='companyId')
              el-select(placeholder='Select' v-model='temp.companyId'  name='companyId' :disabled='dialogIsDetail' )
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.productTypeId')", prop='productTypeId')
              el-select(placeholder='Select' v-model='temp.productTypeId' name='productTypeId' :disabled='dialogIsDetail' )
                el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.proposalNumber')", prop='proposalNumber')
              el-input(v-model='temp.proposalNumber',  name='proposalNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('groupMaintenance.type')", prop='type')
              el-select(placeholder='Select' v-model='temp.type'  name='type' :disabled='dialogIsDetail' )
                el-option(v-for='item in groupTypeOptions', :key='item', :label='item', :value='item')

          el-tab-pane(label='Dates')
            el-form-item(:label="$t('groupMaintenance.proposalDate')" prop='proposalDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.proposalDate', name='proposalDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.effectiveDate')" prop='effectiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', name='effectiveDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.caseCloseDate')" prop='caseCloseDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.caseCloseDate', name='caseCloseDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.terminationDate')" prop='terminationDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.terminationDate', name='terminationDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.ppkReceiveDate')" prop='ppkReceiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.ppkReceiveDate', name='ppkReceiveDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )

          el-tab-pane(label='Other')
            el-form-item(:label="$t('groupMaintenance.totalEmployee')" prop='totalEmployee')
              el-input(v-model='temp.totalEmployee', name='totalEmployee' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.totalEmployeeRegistered')" prop='totalEmployeeRegistered')
              el-input(v-model='temp.totalEmployeeRegistered', name='totalEmployeeRegistered' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.isHavingFundOutsideDplk')" prop='isHavingFundOutsideDplk' )
              el-switch(v-model='temp.isHavingFundOutsideDplk'  name='isHavingFundOutsideDplk' :disabled='dialogIsDetail')
              span.switch-status {{ temp.isHavingFundOutsideDplk?'Yes':'No' }}
            el-form-item(:label="$t('groupMaintenance.isTaxPaidByEmployer')" prop='isTaxPaidByEmployer')
              el-switch(v-model='temp.isTaxPaidByEmployer' name='isTaxPaidByEmployer' :disabled='dialogIsDetail')
              span.switch-status {{ temp.isTaxPaidByEmployer?'Yes':'No' }}
            el-form-item(:label="$t('groupMaintenance.notes')" prop='notes')
              el-input(v-model='temp.notes', name='notes' type='textarea', :autosize='{ minRows: 4, maxRows: 4}' :disabled='dialogIsDetail' )

      .dialog-footer.pull-right(v-show='!dialogNotCreate' style='margin-top:-20px' v-if='!dialogNotCreate')
        el-button(type='primary' @click="createData()")
          | {{ $t('table.confirm') }}

    el-tab-pane(label='Member Class Plan' name='Member Class Plan' :disabled='!dialogNotCreate')
      ClassPlan(:data='temp')
    el-tab-pane(label='Billing Contribution' name='Billing Contribution'  :disabled='!dialogNotCreate')
      Billing(:data='temp')
    el-tab-pane(label='Withdrawal Rule'  name='Withdrawal Rule'  :disabled='!dialogNotCreate')
      Withdrawal(:data='temp')
    //- el-tab-pane(label='Group Charge'  name='Group Charge' :disabled='!dialogNotCreate')
    //-   GroupCharge(:data='temp')
    //- el-tab-pane(label='Group Charge'  name='Group Charge'  :disabled='!dialogNotCreate')
    //- el-tab-pane(label='Agent'  name='Agent' :disabled='!dialogNotCreate')
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
import { fetchGroupMaintanance as fetchRecord, createGroupMaintanance, updateGroupMaintanance } from '@/api/group-maintenance'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchProductType } from '@/api/product-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ClassPlan from './components/classPlan'
import Billing from './components/billing'
import Withdrawal from './components/withdrawal'
// import GroupCharge from './components/groupCharge'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Company',
  components: { Pagination, ClassPlan, Billing, Withdrawal },
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
    dialogNotCreate() {
      return this.dialogStatus !== 'create'
    },
    dialogIsDetail() {
      return this.dialogStatus === 'detail'
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
      if (!date) { return null }
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
        response.isDraft = 1

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
              this.successNotifier()
              this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'update' }, query: { id: response.id }})
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateGroupMaintanance(this.temp).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getRecord()
            }
          })
        }
      })
    }
  }
}
</script>

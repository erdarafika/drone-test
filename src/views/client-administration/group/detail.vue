<template lang="pug">
app-container(:show='!objectId')
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'GroupMaintenance'}) }")
  template(v-slot:header)
    .action-button(v-if='!dialogIsDetail')
      el-button.save(size='small' @click="dialogNotCreate ? updateData() : createData()" v-crud-permission="['maker']")
        | {{ $t('table.save') }}
      RequestApproval(:callback="requestApproval" v-if='temp.status && (temp.status === "draft" || temp.status === "rejected" ) ' v-crud-permission="['maker']")

  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(:label="$t('groupMaintenance.information')" name='Information')
      el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-tab-pane(:label="$t('groupMaintenance.general')")
            el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
              el-input(v-model='temp.name',  name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('groupMaintenance.companyId')", prop='companyId')
              el-select(placeholder='Select' v-model='temp.companyId'  name='companyId' :disabled='dialogIsDetail' )
                el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.productTypeId')", prop='productTypeId' )
              el-select(placeholder='Select' v-model='temp.productTypeId' name='productTypeId' :disabled='dialogIsDetail' @change="chooseType($event)")
                el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('groupMaintenance.proposalNumber')", prop='proposalNumber')
              el-input(v-model='temp.proposalNumber',  name='proposalNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('groupMaintenance.type')", prop='type')
              el-select(v-if="isPpukp === true" placeholder='Select' v-model='temp.type' default-first-option name='type' :disabled='dialogIsDetail')
                el-option(:key="`organization`", :label="`Organization`", :value="`organization`")
              el-select(v-else placeholder='Select' v-model='temp.type' name='type' :disabled='dialogIsDetail')
                el-option(v-for='item in groupTypeOptions', :key='item.value', :label='item.label', :value='item.value')

          el-tab-pane(:label="$t('groupMaintenance.dates')")
            el-form-item(:label="$t('groupMaintenance.proposalDate')" prop='proposalDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.proposalDate', name='proposalDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.effectiveDate')" prop='effectiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', name='effectiveDate' type='date', placeholder='Auto Generated' :disabled='true' )
            el-form-item(:label="$t('groupMaintenance.caseCloseDate')" prop='caseCloseDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.caseCloseDate', name='caseCloseDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('groupMaintenance.terminationDate')" prop='terminationDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.terminationDate', name='terminationDate' type='date', placeholder='Auto Generated' :disabled='true' )
            el-form-item(:label="$t('groupMaintenance.ppkReceiveDate')" prop='ppkReceiveDate')
              el-date-picker(:value-format='dateFormat' v-model='temp.ppkReceiveDate', name='ppkReceiveDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )

          el-tab-pane(:label="$t('groupMaintenance.other')")
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

    el-tab-pane(:label="$t('groupMaintenance.groupclassplan')", name='Group Class Plan' :disabled='!dialogNotCreate')
      ClassPlan(:data='temp')
    el-tab-pane(:label="$t('groupMaintenance.billingcontribution')", name='Billing Contribution'  :disabled='!dialogNotCreate')
      Billing(:data='temp')
    el-tab-pane(:label="$t('groupMaintenance.withdrawrule')"  name='Withdrawal Rule'  :disabled='!dialogNotCreate')
      Withdrawal(:data='temp')
    el-tab-pane(:label="$t('groupMaintenance.investmentdirection')"  name='Investment Direction'  :disabled='!dialogNotCreate')
      el-table(:data="tableData" style="width: 100%" max-height="250")
        el-table-column(prop='label' class-name="has-text-weight-bold")
        el-table-column(prop="value")
    el-tab-pane(:label="$t('groupMaintenance.groupcharge')"  name='Group Charge'  :disabled='!dialogNotCreate')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-tab-pane(label='Name')
           el-form-item(:label="$t('')", prop='' )
    el-tab-pane(:label="$t('groupMaintenance.agent')"  name='Agent'  :disabled='!dialogNotCreate')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style="width: 50%")
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-form-item(:label="`DPLK Sale`", prop='dplkSale' )
            el-input()
          el-form-item(:label="`Commission`", prop='commission')
            .el-input.el-input-group.el-input-group--append
              .el-input__inner()
              .el-input.el-input-group__append %
          el-form-item(:label="`Effective Date`", prop='Effective Date' )
            el-date-picker(:value-format='dateFormat' v-model='temp.effectiveDate', name='effectiveDate'  type='date', placeholder='Pick a date')
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
import { fetchGroupMaintanance as fetchRecord, createGroupMaintanance, updateGroupMaintanance, approveGroupMaintanance } from '@/api/group-maintenance'
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchProductType } from '@/api/product-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ClassPlan from './components/classPlan'
import Billing from './components/billing'
import Withdrawal from './components/withdrawal'
import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: 'Group',
  components: { Pagination, ClassPlan, Billing, Withdrawal },
  props: ['objectId'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      activeTab: 'Information',
      listLoading: true,
      companyOptions: [],
      productTypeOptions: [],
      isPpukp: true,
      groupTypeOptions: [
        { label: 'Organization', value: 'organization' },
        { label: 'Individual', value: 'individual' }
      ],
      temp: {
        id: undefined,
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
        companyId: [requiredValidator],
        productTypeId: [requiredValidator],
        name: [requiredValidator],
        proposalNumber: [requiredValidator, numberValidator],
        proposalDate: [requiredValidator],
        type: [requiredValidator],
        effectiveDate: [],
        caseCloseDate: [requiredValidator],
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
    if (this.objectId) {
      this.temp.id = this.objectId
      this.getRecord()
    } else {
      if ('id' in this.$route.query) {
        this.temp.id = this.$route.query.id
        this.getRecord()
      }
    }
    fetchCompany().then(res => {
      res = res.filter(item => item.status === 'active')
      this.companyOptions = res.map(company => ({ value: company.id, label: company.name }))
    })
    fetchProductType().then(res => {
      this.productTypeOptions = res.map(productType => ({ value: productType.id, label: productType.name }))
    })
  },
  methods: {
    chooseType(event) {
      switch (event) {
        case 1:
          this.isPpukp = false
          this.temp.type = undefined
          break
        case 2:
          this.isPpukp = true
          this.temp.type = 'organization'
          break
      }
    },
    requestApproval() {
      approveGroupMaintanance(this.temp.id).then(response => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
        }
        this.$router.push({ name: 'Company' })
      })
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

        this.temp = response
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
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

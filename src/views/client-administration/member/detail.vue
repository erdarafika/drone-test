<template lang="pug">
  app-container(:show='!objectId')
    template(v-slot:header-left)
      Back(:action="()=> { $router.push({name: 'MemberMaintenance'}) }")
    template(v-slot:header)
      .action-button(v-if='!dialogIsDetail')
        el-button.save(size='small' @click="dialogNotCreate ? updateData() : createData()" v-crud-permission="['maker']")
          | {{ $t('table.save') }}
        RequestApproval(:callback="requestApproval" v-if='temp.status && (temp.status === "draft" || temp.status === "rejected" ) ' v-crud-permission="['maker']")

    el-tabs(type='border-card' v-model='activeTab')
      el-tab-pane(label='Information' name='Information')
        el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
          el-tabs.pane(tab-position='top', style='height:100%;')
            el-tab-pane(label='General')
              el-form-item(:label="$t('membership.certificateNumber')", prop='certificateNumber' )
                el-input(v-model='temp.certificateNumber',  name='certificateNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
              el-form-item(:label="$t('membership.proposalNumber')", prop='proposalNumber' )
                el-input(v-model='temp.proposalNumber',  name='proposalNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
              el-form-item(:label="$t('membership.groupId')", prop='groupId')
                el-select(placeholder='Select' v-model='temp.groupId'  name='groupId' :disabled='dialogIsDetail' )
                  el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(:label="$t('membership.companyId')", prop='companyId')
                el-select(placeholder='Select' v-model='temp.companyId'  name='companyId' :disabled='dialogIsDetail' )
                  el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')

            el-tab-pane(label='Private')
              el-row(:gutter='40')
                el-col(:span='12')
                  el-form-item(:label="$t('membership.name')" prop='name')
                    el-input(v-model='temp.name', name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                  el-form-item(:label="$t('membership.employeeNumberId')" prop='employeeNumberId')
                    el-input(v-model='temp.employeeNumberId', name='employeeNumberId' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                  el-form-item(:label="$t('membership.gender')" prop='gender')
                    el-radio-group(v-model='temp.gender' name='gender')
                      el-radio(label='male') Male
                      el-radio(label='female') Female
                  el-form-item(:label="$t('membership.dobPlace')" prop='dobPlace')
                    el-input(v-model='temp.dobPlace', name='dobPlace' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                  el-form-item(:label="$t('membership.nationality')" prop='nationality')
                    el-radio-group(v-model='temp.nationality' name='nationality')
                      el-radio(label='wni') WNI
                      el-radio(label='wna') WNA
                  el-form-item(:label="$t('membership.identityType')" prop='identityType')
                    el-select(v-model='temp.identityType', name='identityType' placeholder='Select', filterable, default-first-option :disabled='dialogIsDetail')
                      el-option(v-for='item in identityTypeOptions', :key='item.value', :label='item.label', :value='item.value')
                  el-form-item(:label="$t('membership.identityNumber')" prop='identityNumber')
                    el-input(v-model='temp.identityNumber', name='identityNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                el-col(:span='12')
                  el-form-item(:label="$t('membership.normalRetireAge')" prop='normalRetireAge')
                    el-input(:value-format='dateFormat' v-model='temp.normalRetireAge', name='normalRetireAge' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                  el-form-item(:label="$t('membership.employmentDate')" prop='employmentDate')
                    el-date-picker(:value-format='dateFormat' v-model='temp.employmentDate', name='employmentDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
                  el-form-item(:label="$t('membership.dateOfBirth')" prop='dateOfBirth')
                    el-date-picker(:value-format='dateFormat' v-model='temp.dateOfBirth', name='dateOfBirth' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )

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
import Pagination from '@/components/Pagination'
import { fetchMembershipById } from '@/api/membership'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchList as fetchCompany } from '@/api/company'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Member',
  components: { Pagination },
  // eslint-disable-next-line vue/require-prop-types
  props: ['objectId'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      activeTab: 'Information',
      listLoading: true,
      groupOptions: [],
      companyOptions: [],
      identityTypeOptions: [{ label: 'Identity Card', value: 'ktp' }, { label: 'Driving License', value: 'sim' }, { label: 'Passport', value: 'passport' }, { label: 'Kitas', value: 'kitas' }],
      productTypeOptions: [],
      groupTypeOptions: ['organization', 'individual'],
      temp: {
        id: undefined,
        groupId: undefined,
        companyId: undefined,
        avgIncomePerMonth: undefined,
        cellPhoneNumber: undefined,
        cellPhoneNumberPrefix: undefined,
        certificateNumber: undefined,
        certificateStatus: undefined,
        classPlanId: undefined,
        dateOfBirth: undefined,
        dobPlace: undefined,
        effectiveDate: undefined,
        email: undefined,
        employeeNumberId: undefined,
        employmentDate: undefined,
        gender: undefined,
        identityNumber: undefined,
        identityType: undefined,
        job: undefined,
        maritalStatus: undefined,
        moneySource: undefined,
        motherName: undefined,
        name: undefined,
        nationality: undefined,
        normalRetireAge: undefined,
        npwp: undefined,
        phoneNumber: undefined,
        phoneNumberPrefix: undefined,
        proposalNumber: undefined,
        purpose: undefined,
        reason: undefined,
        relationToPayor: undefined,
        religion: undefined,
        salary: undefined,
        isDraft: 1
      },
      dialogStatus: 'create',
      rules: {
        groupId: [requiredValidator],
        companyId: [requiredValidator],
        avgIncomePerMonth: [],
        cellPhoneNumber: [],
        cellPhoneNumberPrefix: [],
        certificateNumber: [],
        certificateStatus: [],
        classPlanId: [],
        dateOfBirth: [],
        dobPlace: [],
        effectiveDate: [],
        email: [],
        employeeNumberId: [],
        employmentDate: [],
        gender: [],
        identityNumber: [requiredValidator],
        identityType: [requiredValidator],
        job: [],
        maritalStatus: [],
        moneySource: [],
        motherName: [],
        name: [requiredValidator],
        nationality: [],
        normalRetireAge: [],
        npwp: [],
        phoneNumber: [],
        phoneNumberPrefix: [],
        proposalNumber: [],
        purpose: [],
        reason: [],
        relationToPayor: [],
        religion: [],
        salary: []
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
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active')
      this.groupOptions = res.map(group => ({ value: group.id, label: group.name }))
    })
    fetchCompany().then(res => {
      res = res.filter(item => item.status === 'active')
      this.companyOptions = res.map(company => ({ value: company.id, label: company.name }))
    })
  },
  methods: {
    reFormatDate(date) {
      if (!date) { return null }
      return this.$moment(date).format(this.momentDateFormat)
    },
    getRecord() {
      this.listLoading = true
      fetchMembershipById(this.temp.id).then(response => {
        response.dateOfBirth = this.reFormatDate(response.dateOfBirth)
        response.effectiveDate = this.reFormatDate(response.effectiveDate)
        response.employmentDate = this.reFormatDate(response.employmentDate)
        response.groupId = response.group.id
        response.companyId = response.group.company.id

        this.temp = response
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        groupId: undefined,
        companyId: undefined,
        avgIncomePerMonth: undefined,
        cellPhoneNumber: undefined,
        cellPhoneNumberPrefix: undefined,
        certificateNumber: undefined,
        certificateStatus: undefined,
        classPlanId: undefined,
        dateOfBirth: undefined,
        dobPlace: undefined,
        effectiveDate: undefined,
        email: undefined,
        employeeNumberId: undefined,
        employmentDate: undefined,
        gender: undefined,
        identityNumber: undefined,
        identityType: undefined,
        job: undefined,
        maritalStatus: undefined,
        moneySource: undefined,
        motherName: undefined,
        name: undefined,
        nationality: undefined,
        normalRetireAge: undefined,
        npwp: undefined,
        phoneNumber: undefined,
        phoneNumberPrefix: undefined,
        proposalNumber: undefined,
        purpose: undefined,
        reason: undefined,
        relationToPayor: undefined,
        religion: undefined,
        salary: undefined
      }
    }
  }
}
</script>

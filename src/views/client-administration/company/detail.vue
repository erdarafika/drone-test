<template lang="pug">
app-container(:show='!objectId')
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'Company'}) }")
  template(v-slot:header)
    .action-button(v-if='!dialogIsDetail')
      el-button.save(size='small' @click="dialogNotCreate ? updateData() : createData()" v-crud-permission="['maker']")
        | {{ $t('table.save') }}
      RequestApproval(:callback="requestApproval" v-if='temp.status && (temp.status === "draft" || temp.status === "rejected" ) ' v-crud-permission="['maker']")

  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(label='Information' name='Information')
      el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='top', style='height:100%;')
          el-tab-pane(:label="$t('companyInformation.general')")
            el-form-item(:label="$t('companyInformation.name')", prop='name' )
              el-input(v-model='temp.name', name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
            el-form-item(:label="$t('companyInformation.email')", prop='email')
              el-input(v-model='temp.email', name='email' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('companyInformation.code')", prop='code')
              el-input(v-model='temp.code', name='code' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='true' placeholder='Auto Generated When Approved')
            el-form-item(:label="$t('companyInformation.website')" prop='website')
              el-input(v-model='temp.website', name='website' type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsDetail' )
          el-tab-pane(label='Legals')
            el-form-item(:label="$t('companyInformation.businessLine')", prop='businessLineId')
              el-select(placeholder='Select' v-model='temp.businessLineId' filterable name='businessLineId' :disabled='dialogIsDetail' )
                el-option(v-for='item in businessLineOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('companyInformation.npwp')", prop='npwp')
              .el-input(:class='dialogIsDetail? "is-disabled": ""')
                the-mask.el-input__inner(v-model='temp.npwp', name='npwp' type='textarea' placeholder='__.___.___._-___.___' :mask="['##.###.###.#-###.###']")
            el-row(:gutter='40')
              el-col(:span='12')
                el-form-item(:label="$t('companyInformation.deedEstablishmentNumber')", prop='deedEstablishmentNumber')
                  el-input(v-model='temp.deedEstablishmentNumber', name='deedEstablishmentNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
                el-form-item(:label="$t('companyInformation.articleAssociationNumber')" prop='articleAssociationNumber')
                  el-input(v-model='temp.articleAssociationNumber', name='articleAssociationNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.latestAmendmentArticleAssociationNumber')" prop='latestAmendmentArticleAssociationNumber')
                  el-input(v-model='temp.latestAmendmentArticleAssociationNumber', name='latestAmendmentArticleAssociationNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.companyNumberRegistrationNumber')" prop='companyNumberRegistrationNumber')
                  el-input(v-model='temp.companyNumberRegistrationNumber', name='companyNumberRegistrationNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.domicilieCertificateNumber')" prop='domicilieCertificateNumber')
                  el-input(v-model='temp.domicilieCertificateNumber', name='domicilieCertificateNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )

              el-col(:span='12')
                el-form-item(:label="$t('companyInformation.deedEstablishmentDate')" prop='deedEstablishmentDate')
                  el-date-picker(:value-format='dateFormat' v-model='temp.deedEstablishmentDate', name='deedEstablishmentDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail'  )
                el-form-item(:label="$t('companyInformation.articleAssociationDate')" prop='articleAssociationDate')
                  el-date-picker(:value-format='dateFormat' v-model='temp.articleAssociationDate', name='articleAssociationDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.latestAmendmentArticleAssociationDate')" prop='latestAmendmentArticleAssociationDate')
                  el-date-picker(:value-format='dateFormat' v-model='temp.latestAmendmentArticleAssociationDate', name='latestAmendmentArticleAssociationDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.companyNumberRegistrationExpiredDate')" prop='companyNumberRegistrationExpiredDate')
                  el-date-picker(:value-format='dateFormat' v-model='temp.companyNumberRegistrationExpiredDate', name='companyNumberRegistrationExpiredDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
                el-form-item(:label="$t('companyInformation.domicilieCertificateNumberExpiredDate')" prop='domicilieCertificateNumberExpiredDate')
                  el-date-picker(:value-format='dateFormat' v-model='temp.domicilieCertificateNumberExpiredDate', name='domicilieCertificateNumberExpiredDate' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
          el-tab-pane(label='Assets Etc')
            el-form-item(:label="$t('companyInformation.asset')" prop='asset')
              el-select(placeholder='Select' v-model='temp.asset' name='asset' :disabled='dialogIsDetail' )
                el-option(v-for='item in assetIncomeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('companyInformation.grossIncomePerYear')" prop='grossIncomePerYear')
              el-select(placeholder='Select' v-model='temp.grossIncomePerYear' name='grossIncomePerYear' :disabled='dialogIsDetail' )
                el-option(v-for='item in assetIncomeOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('companyInformation.moneySource')" prop='moneySource')
              el-input(v-model='temp.moneySource', name='moneySource' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('companyInformation.pensionProgramSubmissionPurpose')" prop='pensionProgramSubmissionPurpose')
              el-input(v-model='temp.pensionProgramSubmissionPurpose', name='pensionProgramSubmissionPurpose' type='textarea', :disabled='dialogIsDetail' :autosize='{ minRows: 4, maxRows: 4}'  )

          el-tab-pane(label='Phone Number')
            el-form-item(:label="$t('companyInformation.office')" prop='office')
              el-input(v-model='temp.office', name='office' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail'  )
            el-form-item(:label="$t('companyInformation.office2')" prop='office2')
              el-input(v-model='temp.office2', name='office2' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('companyInformation.fax')" prop='fax')
              el-input(v-model='temp.fax', name='fax' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
            el-form-item(:label="$t('companyInformation.home')" prop='home')
              el-input(v-model='temp.home', name='home' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )

    el-tab-pane(label='Address' name='Address' :disabled='!dialogNotCreate')
      Address(:data='temp')
    el-tab-pane(label='Contact Person' name='Contact Person' :disabled='!dialogNotCreate')
      ContactPerson(:data='temp')
    el-tab-pane(label='Bank Account' name='Bank Account' :disabled='!dialogNotCreate')
      BankAccount(:data='temp')

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
import { fetchCompany as fetchRecord, createCompany, updateCompany, approveCompany } from '@/api/company'
import { fetchList as fetchBusinessLine } from '@/api/business-line'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Address from './components/address'
import ContactPerson from './components/contactPerson'
import BankAccount from './components/bankAccount'

import rules from './validation-rules'

export default {
  name: 'Company',
  components: { Pagination, Address, ContactPerson, BankAccount },
  props: ['objectId'],
  data() {
    return {
      activeTab: 'Information',
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      listLoading: true,
      businessLineOptions: [],
      assetIncomeOptions: [
        { label: '<= 500 Juta', value: 'lt500m' },
        { label: '>= 500 Juta -  1 Milyar', value: 'gt500mlt1b' },
        { label: '>= 1 Milyar - 10 Milyar', value: 'gt1blt10b' },
        { label: '>= 10 Milyar - 100 Milyar', value: 'gt10b-100b' },
        { label: '>= 100 Milyar - 500 Milyar', value: 'gt100b-500b' },
        { label: '>= 500 Milyar', value: 'gt500b' }
      ],
      temp: {
        id: undefined,
        name: undefined,
        code: undefined,
        email: undefined,
        website: undefined,
        businessLineId: undefined,
        businessEntity: '-',
        npwp: undefined,
        deedEstablishmentNumber: undefined,
        articleAssociationNumber: undefined,
        latestAmendmentArticleAssociationNumber: undefined,
        companyNumberRegistrationNumber: undefined,
        domicilieCertificateNumber: undefined,

        domicilieCertificateNumberExpiredDate: undefined,
        deedEstablishmentDate: undefined,
        articleAssociationDate: undefined,
        latestAmendmentArticleAssociationDate: undefined,
        companyNumberRegistrationExpiredDate: undefined,

        asset: undefined,
        grossIncomePerYear: undefined,
        pensionProgramSubmissionPurpose: undefined,
        moneySource: undefined,

        office: undefined,
        office2: undefined,
        fax: undefined,
        home: undefined,
        isDraft: 1
      },
      dialogStatus: 'create',
      rules
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
    fetchBusinessLine().then(res => {
      this.businessLineOptions = res.map(businessLine => ({ value: businessLine.id, label: businessLine.name }))
    })
  },
  methods: {
    requestApproval() {
      approveCompany(this.temp.id).then(response => {
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
        response.deedEstablishmentDate = this.reFormatDate(response.deedEstablishmentDate)
        response.domicilieCertificateNumberExpiredDate = this.reFormatDate(response.domicilieCertificateNumberExpiredDate)
        response.articleAssociationDate = this.reFormatDate(response.articleAssociationDate)
        response.latestAmendmentArticleAssociationDate = this.reFormatDate(response.latestAmendmentArticleAssociationDate)
        response.companyNumberRegistrationExpiredDate = this.reFormatDate(response.companyNumberRegistrationExpiredDate)
        response.businessLineId = response.businessLine.id
        response.isDraft = 1
        this.temp = response
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        code: undefined,
        email: undefined,
        website: undefined,
        businessLineId: undefined,
        businessEntity: '-',
        npwp: undefined,
        deedEstablishmentNumber: undefined,
        articleAssociationNumber: undefined,
        latestAmendmentArticleAssociationNumber: undefined,
        companyNumberRegistrationNumber: undefined,
        domicilieCertificateNumber: undefined,
        domicilieCertificateNumberExpiredDate: undefined,
        deedEstablishmentDate: undefined,
        articleAssociationDate: undefined,
        latestAmendmentArticleAssociationDate: undefined,
        companyNumberRegistrationExpiredDate: undefined,
        asset: undefined,
        grossIncomePerYear: undefined,
        pensionProgramSubmissionPurpose: undefined,
        moneySource: undefined,
        office: undefined,
        office2: undefined,
        fax: undefined,
        home: undefined,
        isDraft: 1
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCompany(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
            }
            this.$router.push({ name: 'CompanyDetail', params: { action: 'update' }, query: { id: response.id }})
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)

          updateCompany(this.temp).then((response) => {
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

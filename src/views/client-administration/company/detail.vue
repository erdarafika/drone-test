<template lang="pug">
app-container
  div.back-button
    el-button(size='small', @click="$router.push({name: 'Company'})")
      | {{$t('table.back')}}

  el-tabs(type='border-card' v-model='activeTab')
    el-tab-pane(label='Information' name='Information')
      el-form.company-information-form(ref='dataForm' :model='temp', label-position='top', label-width='150px', style='width: 80%')
        el-tabs.pane(tab-position='left', style='height:100%;')
          el-tab-pane(label='General')
            el-form-item(:label="$t('companyInformation.name')", prop='name' )
              el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true' )
            el-form-item(:label="$t('companyInformation.email')", prop='email')
              el-input(v-model='temp.email', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true' )
            el-form-item(:label="$t('companyInformation.code')", prop='code')
              el-input(v-model='temp.code', type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='true' placeholder='Auto Generated When Approved')
            el-form-item(:label="$t('companyInformation.website')" prop='website')
              el-input(v-model='temp.website', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true' )
          el-tab-pane(label='Legals')
            el-form-item(:label="$t('companyInformation.businessLine')", prop='businessLineId')
              el-select(placeholder='Select' v-model='temp.businessLineId'  :disabled='true')
                el-option(v-for='item in businessLineOptions', :key='item.value', :label='item.label', :value='item.value')
            el-form-item(:label="$t('companyInformation.npwp')", prop='npwp')
              el-input(v-model='temp.npwp', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.deedEstablishmentNumber')", prop='deedEstablishmentNumber')
              el-input(v-model='temp.deedEstablishmentNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.articleAssociationNumber')" prop='articleAssociationNumber')
              el-input(v-model='temp.articleAssociationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.latestAmendmentArticleAssociationNumber')" prop='latestAmendmentArticleAssociationNumber')
              el-input(v-model='temp.latestAmendmentArticleAssociationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.companyNumberRegistrationNumber')" prop='companyNumberRegistrationNumber')
              el-input(v-model='temp.companyNumberRegistrationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.domicilieCertificateNumber')" prop='domicilieCertificateNumber')
              el-input(v-model='temp.domicilieCertificateNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
          el-tab-pane(label='Legals Date')
            el-form-item(:label="$t('companyInformation.deedEstablishmentDate')" prop='deedEstablishmentDate')
              el-date-picker( v-model='temp.deedEstablishmentDate', type='date', placeholder='Pick a date'  :disabled='true')
            el-form-item(:label="$t('companyInformation.articleAssociationDate')" prop='articleAssociationDate')
              el-date-picker( v-model='temp.articleAssociationDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('companyInformation.latestAmendmentArticleAssociationDate')" prop='latestAmendmentArticleAssociationDate')
              el-date-picker( v-model='temp.latestAmendmentArticleAssociationDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('companyInformation.companyNumberRegistrationExpiredDate')" prop='companyNumberRegistrationExpiredDate')
              el-date-picker( v-model='temp.companyNumberRegistrationExpiredDate', type='date', placeholder='Pick a date' :disabled='true')
            el-form-item(:label="$t('companyInformation.domicilieCertificateNumberExpiredDate')" prop='domicilieCertificateNumberExpiredDate')
              el-date-picker( v-model='temp.domicilieCertificateNumberExpiredDate', type='date', placeholder='Pick a date' :disabled='true')
          el-tab-pane(label='Assets Etc')
            el-form-item(:label="$t('companyInformation.asset')" prop='asset')
              el-input(v-model='temp.asset', type='textarea', :autosize='{ minRows: 1, maxRows: 2}' prop=''  :disabled='true')
            el-form-item(:label="$t('companyInformation.grossIncomePerYear')" prop='grossIncomePerYear')
              el-input(v-model='temp.grossIncomePerYear', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.moneySource')" prop='moneySource')
              el-input(v-model='temp.moneySource', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.pensionProgramSubmissionPurpose')" prop='pensionProgramSubmissionPurpose')
              el-input(v-model='temp.pensionProgramSubmissionPurpose', type='textarea', :autosize='{ minRows: 4, maxRows: 4}'  :disabled='true')

          el-tab-pane(label='Phone Number')
            el-form-item(:label="$t('companyInformation.office')" prop='office')
              el-input(v-model='temp.office', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.office2')" prop='office2')
              el-input(v-model='temp.office2', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.fax')" prop='fax')
              el-input(v-model='temp.fax', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
            el-form-item(:label="$t('companyInformation.home')" prop='home')
              el-input(v-model='temp.home', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='true')
      .dialog-footer.pull-right( v-show='!true')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary' @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}
    el-tab-pane(label='Address' name='Address')
      Address(:data='temp')
    el-tab-pane(label='Contact Person' name='Contact Person')
      ContactPerson(:data='temp')
    el-tab-pane(label='Bank Account' name='Bank Account')
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
import { fetchCompany as fetchRecord } from '@/api/company'
// import { fetchList as fetchBusinessLine } from '@/api/business-line'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Address from './components/address'
import ContactPerson from './components/contactPerson'
import BankAccount from './components/bankAccount'

export default {
  name: 'Company',
  components: { Pagination, Address, ContactPerson, BankAccount },
  data() {
    return {
      activeTab: 'Information',
      dateFormat: 'dd-MM-yyyy',
      listLoading: true,
      businessLineOptions: [],
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
        home: undefined
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.temp.id = this.$route.params.id
    this.getRecord()

    // fetchBusinessLine().then(res => {
    //   this.businessLineOptions = res.map(businessLine => ({ value: businessLine.id, label: businessLine.name }))
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

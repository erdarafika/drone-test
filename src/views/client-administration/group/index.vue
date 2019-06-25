<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    //- el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
    //-   | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('groupMaintenance.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('groupMaintenance.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('groupMaintenance.productType')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.productType.name }}
    el-table-column(:label="$t('groupMaintenance.status')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    //- el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
    //-   template(slot-scope='{row}')
    //-     el-button(type='success', size='mini', @click='handleDetail(row)')
    //-       | {{ $t('table.detail') }}
        //- el-button(type='danger', size='mini', @click='handleDelete(row)')
        //-   | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  //- el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
  //-   el-tabs(type='border-card' v-model='activeTab')
  //-     el-tab-pane(label='Information' name='Information')
  //-       el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
  //-         el-tabs.pane(tab-position='left', style='height:100%;')
  //-           el-tab-pane(label='General')
  //-             el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
  //-               el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
  //-             el-form-item(:label="$t('groupMaintenance.email')", prop='email')
  //-               el-input(v-model='temp.email', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
  //-             el-form-item(:label="$t('groupMaintenance.code')", prop='code')
  //-               el-input(v-model='temp.code', type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='true' placeholder='Auto Generated When Approved')
  //-             el-form-item(:label="$t('groupMaintenance.website')" prop='website')
  //-               el-input(v-model='temp.website', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
  //-           el-tab-pane(label='Legals')
  //-             el-form-item(:label="$t('groupMaintenance.businessLine')", prop='businessLine')
  //-               el-select(placeholder='Select' v-model='temp.businessLine'  :disabled='dialogIsUpdate')
  //-                 el-option(v-for='item in businessLineOptions', :key='item.value', :label='item.label', :value='item.value')
  //-             el-form-item(:label="$t('groupMaintenance.npwp')", prop='npwp')
  //-               el-input(v-model='temp.npwp', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.deedEstablishmentNumber')", prop='deedEstablishmentNumber')
  //-               el-input(v-model='temp.deedEstablishmentNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.articleAssociationNumber')" prop='articleAssociationNumber')
  //-               el-input(v-model='temp.articleAssociationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.latestAmendmentArticleAssociationNumber')" prop='latestAmendmentArticleAssociationNumber')
  //-               el-input(v-model='temp.latestAmendmentArticleAssociationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.companyNumberRegistrationNumber')" prop='companyNumberRegistrationNumber')
  //-               el-input(v-model='temp.companyNumberRegistrationNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.domicilieCertificateNumber')" prop='domicilieCertificateNumber')
  //-               el-input(v-model='temp.domicilieCertificateNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-           el-tab-pane(label='Legals Date')
  //-             el-form-item(:label="$t('groupMaintenance.deedEstablishmentDate')" prop='deedEstablishmentDate')
  //-               el-date-picker(v-model='temp.deedEstablishmentDate', type='date', placeholder='Pick a date'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.articleAssociationDate')" prop='articleAssociationDate')
  //-               el-date-picker(v-model='temp.articleAssociationDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.latestAmendmentArticleAssociationDate')" prop='latestAmendmentArticleAssociationDate')
  //-               el-date-picker(v-model='temp.latestAmendmentArticleAssociationDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.companyNumberRegistrationExpiredDate')" prop='companyNumberRegistrationExpiredDate')
  //-               el-date-picker(v-model='temp.companyNumberRegistrationExpiredDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.domicilieCertificateNumberExpiredDate')" prop='domicilieCertificateNumberExpiredDate')
  //-               el-date-picker(v-model='temp.domicilieCertificateNumberExpiredDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
  //-           el-tab-pane(label='Assets Etc')
  //-             el-form-item(:label="$t('groupMaintenance.asset')" prop='asset')
  //-               el-input(v-model='temp.asset', type='textarea', :autosize='{ minRows: 1, maxRows: 2}' prop=''  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.grossIncomePerYear')" prop='grossIncomePerYear')
  //-               el-input(v-model='temp.grossIncomePerYear', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.moneySource')" prop='moneySource')
  //-               el-input(v-model='temp.moneySource', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.pensionProgramSubmissionPurpose')" prop='pensionProgramSubmissionPurpose')
  //-               el-input(v-model='temp.pensionProgramSubmissionPurpose', type='textarea', :autosize='{ minRows: 4, maxRows: 4}'  :disabled='dialogIsUpdate')

  //-           el-tab-pane(label='Phone Number')
  //-             el-form-item(:label="$t('groupMaintenance.office')" prop='office')
  //-               el-input(v-model='temp.office', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.office2')" prop='office2')
  //-               el-input(v-model='temp.office2', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.fax')" prop='fax')
  //-               el-input(v-model='temp.fax', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-             el-form-item(:label="$t('groupMaintenance.home')" prop='home')
  //-               el-input(v-model='temp.home', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
  //-       .dialog-footer.pull-right( v-show='!dialogIsUpdate')
  //-         el-button(@click='dialogFormVisible = false')
  //-           | {{ $t('table.cancel') }}
  //-         el-button(type='primary' @click="dialogStatus==='create'?createData():updateData()")
  //-           | {{ $t('table.confirm') }}
  //-     el-tab-pane(label='Address' :disabled='!dialogIsUpdate' name='Address')
  //-       Address(:data='temp')
  //-     el-tab-pane(label='Contact Person' :disabled='!dialogIsUpdate' name='Contact Person')
  //-       ContactPerson(:data='temp')
  //-     el-tab-pane(label='Bank Account'  :disabled='!dialogIsUpdate' name='Bank Account')
  //-       BankAccount(:data='temp')

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
import { fetchList, createGroupMaintanance, updateGroupMaintanance, deleteGroupMaintanance } from '@/api/group-maintenance'
import { fetchList as fetchBusinessLine } from '@/api/business-line'
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
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      businessLineOptions: [],
      dummyOptions: ['Option 1', 'Option 2'],
      temp: {
        name: undefined,
        code: undefined,
        email: undefined,
        website: undefined,
        businessLine: undefined,
        businessEntity: undefined,
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
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'this field is required' }],
        code: [],
        email: [{ type: 'email', message: 'email invalid' }],
        website: [],
        businessLine: [],
        businessEntity: [],
        npwp: [],
        deedEstablishmentNumber: [],
        articleAssociationNumber: [],
        latestAmendmentArticleAssociationNumber: [],
        companyNumberRegistrationNumber: [],
        domicilieCertificateNumber: [],

        domicilieCertificateNumberExpiredDate: [],
        deedEstablishmentDate: [],
        articleAssociationDate: [],
        latestAmendmentArticleAssociationDate: [],
        companyNumberRegistrationExpiredDate: [],

        asset: [],
        grossIncomePerYear: [],
        pensionProgramSubmissionPurpose: [],
        moneySource: [],

        office: [],
        office2: [],
        fax: [],
        home: []
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
    this.getList()
    fetchBusinessLine().then(res => {
      this.businessLineOptions = res.map(businessLine => ({ value: businessLine.id, label: businessLine.name }))
    })
  },
  methods: {
    handleDetail(row) {
      // this.resetTemp()
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        code: undefined,
        email: undefined,
        website: undefined,
        businessLine: undefined,
        businessEntity: undefined,
        npwp: undefined,
        deedEstablishmentNumber: undefined,
        articleAssociationNumber: undefined,
        latestAmendmentArticleAssociationNumber: undefined,
        companyNumberRegistrationNumber: undefined,
        domicilieCertificateNumber: undefined,
        domicilieCertificateNumberExpiredDate: undefined,
        companyNumberRegistrationExpiredDate: undefined,
        latestAmendmentArticleAssociationDate: undefined,
        articleAssociationDate: undefined,
        deedEstablishmentDate: undefined,
        asset: undefined,
        grossIncomePerYear: undefined,
        pensionProgramSubmissionPurpose: undefined,
        moneySource: undefined,
        office: undefined,
        office2: undefined,
        fax: undefined,
        home: undefined
      }
    },
    handleCreate() {
      this.activeTab = 'Information'
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.temp);

          createGroupMaintanance(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.activeTab = 'Information'
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateGroupMaintanance(this.temp).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.$notify({
        title: this.$t('table.cancelTitle'),
        message: this.$t('table.cancelCaption'),
        type: 'warning',
        duration: 2000
      })

      const deleteCallback = () => {
        deleteGroupMaintanance(row).then((response) => {
          this.dialogFormVisible = false
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
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
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        el-button(type='success', size='mini', @click='handleDetail(row)')
          | {{ $t('table.detail') }}
        //- el-button(type='danger', size='mini', @click='handleDelete(row)')
        //-   | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-tabs(type='border-card' v-model='activeTab')
      el-tab-pane(label='Information' name='Information')
        el-form.company-information-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
          el-tabs.pane(tab-position='left', style='height:100%;')

            el-tab-pane(label='General')
              //-     isDraft: undefined,
              el-form-item(:label="$t('groupMaintenance.name')", prop='name' )
                el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
              el-form-item(:label="$t('groupMaintenance.companyId')", prop='companyId')
                el-select(placeholder='Select' v-model='temp.companyId'  :disabled='dialogIsUpdate')
                  el-option(v-for='item in companyOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(:label="$t('groupMaintenance.productTypeId')", prop='productTypeId')
                el-select(placeholder='Select' v-model='temp.productTypeId'  :disabled='dialogIsUpdate')
                  el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(:label="$t('groupMaintenance.proposalNumber')", prop='proposalNumber')
                el-input(v-model='temp.proposalNumber', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate' )
              el-form-item(:label="$t('groupMaintenance.type')", prop='type')
                el-select(placeholder='Select' v-model='temp.type'  :disabled='dialogIsUpdate')
                  el-option(v-for='item in groupTypeOptions', :key='item', :label='item', :value='item')

            el-tab-pane(label='Dates')
              el-form-item(:label="$t('groupMaintenance.proposalDate')" prop='proposalDate')
                el-date-picker(v-model='temp.proposalDate', type='date', placeholder='Pick a date'  :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.effectiveDate')" prop='effectiveDate')
                el-date-picker(v-model='temp.effectiveDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.caseCloseDate')" prop='caseCloseDate')
                el-date-picker(v-model='temp.caseCloseDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.terminationDate')" prop='terminationDate')
                el-date-picker(v-model='temp.terminationDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.ppkReceiveDate')" prop='ppkReceiveDate')
                el-date-picker(v-model='temp.ppkReceiveDate', type='date', placeholder='Pick a date' :disabled='dialogIsUpdate')

            el-tab-pane(label='Other')
              el-form-item(:label="$t('groupMaintenance.totalEmployee')" prop='totalEmployee')
                el-input(v-model='temp.totalEmployee', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.totalEmployeeRegistered')" prop='totalEmployeeRegistered')
                el-input(v-model='temp.totalEmployeeRegistered', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.isHavingFundOutsideDplk')" prop='isHavingFundOutsideDplk')
                el-input(v-model='temp.isHavingFundOutsideDplk', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.isTaxPaidByEmployer')" prop='isTaxPaidByEmployer')
                el-input(v-model='temp.isTaxPaidByEmployer', type='textarea', :autosize='{ minRows: 1, maxRows: 2}'  :disabled='dialogIsUpdate')
              el-form-item(:label="$t('groupMaintenance.notes')" prop='notes')
                el-input(v-model='temp.notes', type='textarea', :autosize='{ minRows: 4, maxRows: 4}'  :disabled='dialogIsUpdate')

        .dialog-footer.pull-right( v-show='!dialogIsUpdate')
          el-button(@click='dialogFormVisible = false')
            | {{ $t('table.cancel') }}
          el-button(type='primary' @click="dialogStatus==='create'?createData():updateData()")
            | {{ $t('table.confirm') }}

      el-tab-pane(label='Member Class Plan' :disabled='!dialogIsUpdate' name='Member Class Plan')
        ClassPlan(:data='temp')
      el-tab-pane(label='Billing Contribution' :disabled='!dialogIsUpdate' name='Billing Contribution')
        //- Billing Contribution(:data='temp')
      el-tab-pane(label='Investment Direction'  :disabled='!dialogIsUpdate' name='Investment Direction')
      el-tab-pane(label='Group Charge'  :disabled='!dialogIsUpdate' name='Group Charge')
      el-tab-pane(label='Withdrawal Rule'  :disabled='!dialogIsUpdate' name='Withdrawal Rule')
      el-tab-pane(label='Agent'  :disabled='!dialogIsUpdate' name='Agent')
        //- BankAccount(:data='temp')

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
import { fetchList as fetchCompany } from '@/api/company'
import { fetchList as fetchProductType } from '@/api/product-type'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ClassPlan from './components/classPlan'
// import ContactPerson from './components/contactPerson'
// import BankAccount from './components/bankAccount'

export default {
  name: 'Company',
  components: { Pagination, ClassPlan },
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
      companyOptions: [],
      productTypeOptions: [],
      groupTypeOptions: ['Organization', 'Individu'],
      temp: {
        // id: undefined,
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
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        // id: undefined,
        isDraft: [{ required: true, message: 'this field is required' }],
        companyId: [],
        productTypeId: [{ required: true, message: 'this field is required' }],
        name: [{ required: true, message: 'this field is required' }],
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
    this.getList()
    fetchCompany().then(res => {
      this.companyOptions = res.map(company => ({ value: company.id, label: company.name }))
    })
    fetchProductType().then(res => {
      this.productTypeOptions = res.map(productType => ({ value: productType.id, label: productType.name }))
    })
  },
  methods: {
    handleDetail(row) {
      // this.resetTemp()
      this.temp = {
        id: row.id,
        companyId: row.company.id,
        productTypeId: row.productType.id,
        name: row.name,
        proposalNumber: row.proposalNumber,
        proposalDate: row.proposalDate,
        type: row.type,
        effectiveDate: row.effectiveDate,
        caseCloseDate: row.caseCloseDate,
        terminationDate: row.terminationDate,
        ppkReceiveDate: row.ppkReceiveDate,
        totalEmployee: row.totalEmployee,
        totalEmployeeRegistered: row.totalEmployeeRegistered,
        isHavingFundOutsideDplk: row.isHavingFundOutsideDplk,
        isTaxPaidByEmployer: row.isTaxPaidByEmployer,
        notes: row.notes
      }
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
          console.log(this.temp)

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

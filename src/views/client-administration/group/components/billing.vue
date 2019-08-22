
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('groupBilling.frequency')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.frequency }}
    el-table-column(:label="$t('groupBilling.paymentMethod')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.paymentMethod | striped-to-titlecase }}
    el-table-column(:label="$t('groupBilling.payor')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.payor | capitalize }}
    el-table-column(:label="$t('groupBilling.dplkBankId')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.dplkBankId }}
    el-table-column(:label="$t('groupBilling.billingDate')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.billingDate }}
    el-table-column(label='', align='right', width='150' )
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('groupBilling.frequency')", prop='frequency')
        el-select(placeholder='Select' v-model='temp.frequency' name='frequency')
          el-option(v-for='item in frequencyOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('groupBilling.paymentMethod')", prop='paymentMethod')
        el-select(placeholder='Select' v-model='temp.paymentMethod'  name='paymentMethod')
          el-option(v-for='item in paymentMethodOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('groupBilling.payor')", prop='payor')
        el-select(placeholder='Select' v-model='temp.payor' name='payor' @change="changePayor")
          el-option(v-for='item in payorOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('groupBilling.billingDate')" prop='billingDate')
        el-date-picker(:value-format='dateFormat' v-model='temp.billingDate', name='billingDate'  type='date', placeholder='Pick a date')
      el-form-item(:label="$t('groupBilling.dplkBankId')" prop='dplkBankId')
        el-select(placeholder='Select' v-model='temp.dplkBankId' name='dplkBankId')
          el-option(v-for='item in dplkBankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceName')", prop='correspondenceName' )
        el-input(v-model='temp.correspondenceName', name='correspondenceName' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(:label="$t('groupBilling.correspondenceGender')", prop='correspondenceGender')
        el-select(placeholder='Select' v-model='temp.correspondenceGender' name='correspondenceGender')
          el-option(v-for='item in correspondenceGenderOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceEmail')", prop='correspondenceEmail' )
        el-input(v-model='temp.correspondenceEmail', name='correspondenceEmail' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceCarbonCopy')", prop='correspondenceCarbonCopy' )
        el-input(v-model='temp.correspondenceCarbonCopy', name='correspondenceCarbonCopy' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondencePhoneNumber')", prop='correspondencePhoneNumber' )
        el-input(v-model='temp.correspondencePhoneNumber', name='correspondencePhoneNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceTitle')", prop='correspondenceTitle' )
        el-input(v-model='temp.correspondenceTitle', name='correspondenceTitle' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(:label="$t('groupBilling.correspondenceNationality')", prop='correspondenceNationality')
        el-select(placeholder='Select' v-model='temp.correspondenceNationality' name='correspondenceNationality')
          el-option(v-for='item in correspondenceNationalityOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceIdentityNumber')", prop='correspondenceIdentityNumber' )
        el-input(v-model='temp.correspondenceIdentityNumber', name='correspondenceIdentityNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
      el-form-item(v-if="isPaymentBySelf !== true" :label="$t('groupBilling.correspondenceIdentityType')", prop='correspondenceIdentityType' )
        el-input(v-model='temp.correspondenceIdentityType', name='correspondenceIdentityType' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail')
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createGroupBilling, updateGroupBilling, deleteGroupBilling } from '@/api/group-billing'
import { fetchList as fetchDplkBankList } from '@/api/dplk-bank-account'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator } from '@/global-function/formValidator'
import { alphabeticValidator, numberValidator } from '../../../../global-function/formValidator'

export default {
  name: 'GroupBilling',
  components: { Pagination },
  props: ['data'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableKey: 0,
      list: [],
      total: 0,
      isPaymentBySelf: true,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        groupId: undefined,
        frequency: 1,
        paymentMethod: undefined,
        payor: undefined,
        billingDate: undefined,
        dplkBankId: undefined,
        correspondenceName: undefined
      },
      frequencyOptions: [{ label: 'Monthly', value: 1 }, { label: 'Quarterly', value: 4 }, { label: 'Semi Anually', value: 6 }, { label: 'Anually', value: 12 }],
      paymentMethodOptions: [{ label: 'Bank Transfer', value: 'bank-transfer' }, { label: 'Virtual Account', value: 'virtual-account' }],
      payorOptions: [{ label: 'Self', value: 'self' }, { label: 'Others', value: 'others' }],
      correspondenceGenderOptions: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'female' }],
      correspondenceNationalityOptions: [{ label: 'WNI', value: 'wni' }, { label: 'WNA', value: 'wni' }],
      dplkBankOptions: undefined,
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        frequency: [requiredValidator],
        paymentMethod: [requiredValidator],
        payor: [requiredValidator],
        billingDate: [requiredValidator],
        dplkBankId: [requiredValidator],
        correspondencePhoneNumber: [requiredValidator, numberValidator],
        correspondenceGenderOptions: [requiredValidator],
        correspondenceNationalityOptions: [requiredValidator],
        correspondenceCarbonCopy: [requiredValidator],
        correspondenceTitle: [requiredValidator, alphabeticValidator],
        correspondenceEmail: [requiredValidator],
        correspondenceIdentityNumber: [requiredValidator, numberValidator],
        correspondenceIdentityType: [requiredValidator],
        correspondenceName: [requiredValidator, alphabeticValidator]

      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    if (this.data.id) {
      this.getList()
      this.temp.groupId = this.data.id
    }
    fetchDplkBankList().then(res => {
      this.dplkBankOptions = res.map(item => ({ label: `${item.bank.bankName} | ${item.accountName}`, value: item.id }))
    })
  },
  methods: {
    changePayor(event) {
      if (event === 'others') {
        this.isPaymentBySelf = false
      } else {
        this.isPaymentBySelf = true
      }
      console.log(this.isPaymentBySelf)
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
      fetchList(this.data.id).then(response => {
        console.log(response)

        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        groupId: this.data.id,
        frequency: 1,
        paymentMethod: undefined,
        payor: undefined,
        billingDate: undefined,
        dplkBankId: undefined
      }
    },
    handleCreate() {
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
          this.temp['companyId'] = this.data.id
          createGroupBilling(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        groupId: this.data.id,
        frequency: row.frequency,
        paymentMethod: row.paymentMethod,
        payor: row.payor,
        billingDate: row.billingDate,
        dplkBankId: row.dplkBank.id
      }
      this.initialUpdate = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateGroupBilling(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      row['groupId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteGroupBilling(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

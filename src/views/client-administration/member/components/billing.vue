<template lang="pug">
el-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
  el-row(:gutter="40")
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.billingId')")
        el-switch(v-model='temp.isAutomatic' name='isAutomatic')
        span.switch-status {{ $t('memberBilling.isAutomatic') + ' ' }}
        el-switch(v-model='temp.sendNotification' name='sendNotification')
        span.switch-status {{ $t('memberBilling.sendNotification') }}
      el-row
        el-form-item(v-if="temp.sendNotification === true" :label="$t('memberBilling.notificationScheduler')" prop="notificationScheduler")
          el-col(:span="4")
            el-form-item(:label="``", prop="isPlusDay")
              el-select(placeholder='+ / -' v-model='temp.isPlusDay' name='isPlusDay')
                el-option(:label='`+`', :value='`+`')
                el-option(:label='`-`', :value='`-`')
          el-col(:span="8")
            el-form-item(:label="``", prop="notificationSchedulerDay")
              el-select(placeholder='Select' v-model='temp.notificationSchedulerDay' name='notificationSchedulerDay')
                el-option(v-for='item in notificationSchedulerDayOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('memberBilling.billingDate')", prop='billingDate')
        el-date-picker(:value-format='dateFormat' v-model='temp.billingDate', name='billingDate' type='textarea', placeholder='Pick a date')
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.frequency')", prop='frequency')
        el-select(placeholder='Select' v-model='temp.frequency' name='frequency')
          el-option(v-for='item in frequencyOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('memberBilling.dplkBankId')", prop='dplkBankId')
        el-select(placeholder='Select' v-model='temp.dplkBankId' name='dplkBankId' @change="getDplkBank")
          el-option(v-for='item in dplkBankOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('memberBilling.payor')", prop='payor')
        el-select(placeholder='Select' v-model='temp.payor' name='payor')
          el-option(v-for='item in payorOptions', :key='item.value', :label='item.label', :value='item.value')
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.paymentMethod')", prop='paymentMethod')
        el-select(placeholder='Select' v-model='temp.paymentMethod' name='paymentMethod')
          el-option(v-for='item in paymentMethodOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(v-if="temp.dplkBankId !== undefined")
        el-card
          table
            tr
              td
                b {{ $t('dplkBank.accountName') }}
              td
                b :
              td {{ dplkBank.accountName }}
            tr
              td
                b {{ $t('dplkBank.accountNumber') }}
              td
                b :
              td {{ dplkBank.accountNumber }}
            tr
              td
                b {{ $t('dplkBank.bankName') }}
              td
                b :
              td {{ dplkBank.bank.bankName }}
  el-row(:gutter="40" v-if="temp.payor !== 'self'")
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.correspondenceName')", prop='correspondenceName')
        el-input(v-model='temp.correspondenceName', name='correspondenceName' type='input', placeholder='Ex: John')
      el-form-item(:label="$t('memberBilling.correspondenceTitle')", prop='correspondenceTitle')
        el-input(v-model='temp.correspondenceTitle', name='correspondenceTitle' type='input', placeholder='Ex: example@email.com')
      el-form-item(:label="$t('memberBilling.correspondenceNationality')", prop='correspondenceNationality')
        el-select(placeholder='Select' v-model='temp.nationality' name='nationality')
          el-option(v-for='item in correspondenceNationalityOptions', :key='item.value', :label='item.label', :value='item.value')
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.correspondenceIdentityType')", prop='correspondenceIdentityType')
        el-select(placeholder='Select' v-model='temp.correspondenceIdentityType' name='correspondenceIdentityType')
          el-option(v-for='item in correspondenceIdentityTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('memberBilling.correspondenceIdentityNumber')", prop='correspondenceIdentityNumber')
        el-input(v-model='temp.correspondenceIdentityNumber', name='correspondenceIdentityNumber' type='input', placeholder='Ex: 230493589383')
      el-form-item(:label="$t('memberBilling.correspondenceGender')", prop='correspondenceGender')
        el-select(placeholder='Select' v-model='temp.correspondenceGender' name='correspondenceGender')
          el-option(v-for='item in correspondenceGenderOptions', :key='item.value', :label='item.label', :value='item.value')
    el-col(:span="8")
      el-form-item(:label="$t('memberBilling.correspondenceEmail')", prop='correspondenceEmail')
        el-input(v-model='temp.correspondenceEmail', name='correspondenceEmail' type='input', placeholder='Ex: example@email.com')
      el-form-item(:label="$t('memberBilling.correspondencePhoneNumber')", prop='correspondencePhoneNumber')
        el-input(v-model='temp.correspondencePhoneNumber', name='correspondencePhoneNumber' type='input', placeholder='Ex: 0893465xxx')
      el-form-item(:label="$t('memberBilling.correspondenceCarbonCopy')", prop='correspondenceCarbonCopy')
        el-input(v-model='temp.correspondenceCarbonCopy', name='correspondenceCarbonCopy' type='input', placeholder='Ex: example@email.com')
  el-row
    el-col
      el-button(type="primary" @click="createOrUpdateData") {{ $t('table.confirm') }}

</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchList as getAllDplkBank, getDplkBankAccount } from '@/api/dplk-bank-account'
import { requiredValidator, alphabeticValidator, numberValidator, emailValidator } from '@/global-function/formValidator'
import { createOrUpdateRecord, getRecord as getMemberBilling } from '@/api/member-billing'
export default {
  name: 'MemberBilling',
  components: { Pagination },
  props: ['data'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      listLoading: true,
      dplkBankOptions: [],
      dplkBank: {
        accountName: undefined,
        accountNumber: undefined,
        bank: {
          bankName: undefined
        }
      },
      frequencyOptions: [{ label: 'Monthly', value: 1 }, { label: 'Quarterly', value: 4 }, { label: 'Semi Anually', value: 6 }, { label: 'Anually', value: 12 }],
      paymentMethodOptions: [{ label: 'Bank Transfer', value: 'bank-transfer' }],
      payorOptions: [{ label: 'Self', value: 'self' }, { label: 'Others', value: 'others' }],
      correspondenceGenderOptions: [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'female' }],
      correspondenceNationalityOptions: [{ label: 'WNI', value: 'wni' }, { label: 'WNA', value: 'wna' }],
      correspondenceIdentityTypeOptions: [
        { label: 'KTP', value: 'ktp' },
        { label: 'Kitas', value: 'kitas' },
        { label: 'SIM', value: 'sim' },
        { label: 'Passport', value: 'passport' }
      ],
      notificationSchedulerDay: undefined,
      isPlusDay: undefined,
      notificationSchedulerDayOptions: [
        { label: this.$t('schedulerDay.zeroDay'), value: 0 },
        { label: this.$t('schedulerDay.oneDay'), value: 1 },
        { label: this.$t('schedulerDay.twoDay'), value: 2 },
        { label: this.$t('schedulerDay.threeDay'), value: 3 },
        { label: this.$t('schedulerDay.fourDay'), value: 4 },
        { label: this.$t('schedulerDay.fiveDay'), value: 5 },
        { label: this.$t('schedulerDay.sixDay'), value: 6 },
        { label: this.$t('schedulerDay.sevenDay'), value: 7 },
        { label: this.$t('schedulerDay.fourteenDay'), value: 14 },
        { label: this.$t('schedulerDay.twentyEightDay'), value: 28 }
      ],
      temp: {
        billingDate: undefined,
        correspondenceCarbonCopy: undefined,
        correspondenceEmail: undefined,
        correspondenceGender: undefined,
        correspondenceIdentityNumber: undefined,
        correspondenceIdentityType: undefined,
        correspondenceName: undefined,
        correspondenceNationality: undefined,
        correspondencePhoneNumber: undefined,
        notificationScheduler: undefined,
        notificationSchedulerDay: undefined,
        correspondenceTitle: undefined,
        isPlusDay: undefined,
        dplkBankId: undefined,
        frequency: undefined,
        isAutomatic: undefined,
        nextBillingSequence: undefined,
        paymentMethod: undefined,
        payor: undefined,
        sendNotification: undefined
      },
      initialUpdate: false,
      dialogStatus: '',
      rules: {
        billingDate: [requiredValidator],
        frequency: [requiredValidator, numberValidator],
        nextBillingSequence: [requiredValidator],
        paymentMethod: [requiredValidator],
        payor: [requiredValidator],
        isPlusDay: [requiredValidator],
        notificationSchedulerDay: [requiredValidator],
        correspondenceCarbonCopy: [requiredValidator, emailValidator],
        correspondenceEmail: [requiredValidator, emailValidator],
        correspondenceGender: [requiredValidator],
        correspondenceIdentityNumber: [requiredValidator, numberValidator],
        correspondenceIdentityType: [requiredValidator],
        correspondenceName: [requiredValidator, alphabeticValidator],
        correspondenceNationality: [requiredValidator],
        correspondencePhoneNumber: [requiredValidator, numberValidator],
        correspondenceTitle: [requiredValidator]
      }
    }
  },
  created() {
    this.getDplkBankOptions()
    if (this.data.id) {
      this.getRecord()
    }
  },
  methods: {
    reFormatDate(date) {
      if (!date) { return null }
      return this.$moment(date).format(this.momentDateFormat)
    },
    getDplkBankOptions() {
      getAllDplkBank().then(response => {
        this.dplkBankOptions = response.map(dplkBank => ({ value: dplkBank.id, label: dplkBank.accountName + ' - ' + dplkBank.bank.bankName }))
      })
    },
    getDplkBank() {
      getDplkBankAccount(this.temp.dplkBankId).then(response => {
        this.dplkBank = response
      })
    },
    getRecord() {
      getMemberBilling(this.data.id).then(response => {
        response.billingDate = this.reFormatDate(response.billingDate)
        response.nextBillingSequence = this.reFormatDate(response.nextBillingSequence)
        this.temp = response
        this.temp.dplkBankId = response.dplkBank.id
        this.dplkBank = response.dplkBank
        if (response.notificationScheduler !== undefined) {
          this.temp.isPlusDay = '+'
          this.temp.notificationSchedulerDay = response.notificationScheduler
          if (response.notificationScheduler < 0) {
            this.temp.isPlusDay = '-'
            this.temp.notificationScheduler = response.notificationScheduler * -1
          }
        }
      })
    },
    createOrUpdateData() {
      this.temp.notificationScheduler = this.temp.notificationSchedulerDay
      if (this.temp.isPlusDay !== '+') {
        this.temp.notificationScheduler = this.temp.notificationSchedulerDay * -1
      }
      console.log(this.temp)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.memberId = this.data.id
          createOrUpdateRecord(this.temp).then(response => {
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


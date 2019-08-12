<template lang="pug">
app-container
  el-tabs(type='border-card')
    el-tab-pane(label='Simulation')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='250px')
        el-row(:gutter='40')
          el-col(:span='12')
            el-form-item(:label="`Average Life Expectancy`", prop='averageLifeExpectancy')
              el-input(v-model.number='temp.averageLifeExpectancy', name='averageLifeExpectancy')
            el-form-item(:label="`Average Return of Investment`", prop='averageReturnOfInvestment')
              el-input(v-model.number='temp.averageReturnOfInvestment', name='averageReturnOfInvestment')
            el-form-item(:label="`Current Age`", prop='currentAge')
              el-input(v-model.number='temp.currentAge', name='currentAge')
            el-form-item(:label="`Current Salary`", prop='currentSalary')
              el-input(v-model.number='temp.currentSalary', name='currentSalary')
            el-form-item(:label="`Ideal Replacment Ratio`", prop='idealReplacemenRatio')
              el-input(v-model.number='temp.idealReplacemenRatio', name='idealReplacemenRatio')
          el-col(:span='12')
            el-form-item(:label="`Current Pension Asset`", prop='currentPensionAsset')
              el-input(v-model.number='temp.currentPensionAsset', name='currentPensionAsset')
            el-form-item(:label="`Retire Age`", prop='retireAge')
              el-input(v-model.number='temp.retireAge', name='retireAge')
        el-form-item
          el-button.pull-right(@click='calculateSimulation' style='margin-left: 20px;') Calculate
          el-button.pull-right(@click='resetTemp') Cancel
</template>

<script>
// import { createRecord, approveRecord } from '@/api/static/contribution-billing-ppip-individu'
import rules from '../validation-rules'

export default {
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      listLoading: true,
      temp: {
        averageLifeExpectancy: undefined,
        averageReturnOfInvestment: undefined,
        currentAge: undefined,
        currentSalary: undefined,
        idealReplacemenRatio: undefined,
        currentPensionAsset: undefined,
        retireAge: undefined
      },
      rules
    }
  },
  created() {
    this.resetTemp()
  },
  methods: {
    calculateSimulation() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // createRecord(this.temp).then((response) => {
          //   if (response.status_code >= 200 && response.status_code <= 300) {
          //     approveRecord(this.temp).then(response => {
          //       if (response.status_code >= 200 && response.status_code <= 300) {
          //         this.successNotifier()
          //       }
          //       this.$router.push({ name: 'ContributionBilling' })
          //     })
          //   }
          // })
        }
      })
    },
    resetTemp() {
      this.temp = {
        averageLifeExpectancy: undefined,
        averageReturnOfInvestment: undefined,
        currentAge: undefined,
        currentSalary: undefined,
        idealReplacemenRatio: undefined,
        currentPensionAsset: undefined,
        retireAge: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


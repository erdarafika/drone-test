<template lang="pug">
app-container
  el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='250px')
    el-row(:gutter='40')
      el-col(:span='12')
        el-form-item(:label="$t('contributionSimulation.averageLifeExpectations')", prop='averageLifeExpectations')
          el-input(v-model.number='temp.averageLifeExpectations', name='averageLifeExpectations')
        el-form-item(:label="$t('contributionSimulation.averageReturnOfInvestment')", prop='averageReturnOfInvestment')
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend %
            money.el-input__inner(v-model.number='temp.averageReturnOfInvestment', name='averageReturnOfInvestment' v-bind='configSeparator')
        el-form-item(:label="$t('contributionSimulation.currentAge')", prop='currentAge')
          el-input(v-model.number='temp.currentAge', name='currentAge')
        el-form-item(:label="$t('contributionSimulation.currentSalary')", prop='currentSalary')
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend Rp
            money.el-input__inner(v-model.number='temp.currentSalary', name='currentSalary' v-bind='configSeparator')
        el-form-item(:label="$t('contributionSimulation.ideaReplacementRatio')", prop='currentSalary')
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend %
            money.el-input__inner(v-model.number='temp.currentSalary', name='currentSalary' v-bind='configSeparator')
        el-form-item(:label="$t('contributionSimulation.currentPensionAssets')", prop='currentPensionAssets')
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend Rp
            money.el-input__inner(v-model.number='temp.currentPensionAssets', name='currentPensionAssets' v-bind='configSeparator')
        el-form-item(:label="$t('contributionSimulation.retireAge')", prop='retireAge')
          el-input(v-model.number='temp.retireAge', name='retireAge')
      //el-col(:span='12')
    el-form-item
      el-button.pull-right(@click='createContribution' style='margin-left: 20px;') Calculate
      el-button.pull-right(@click='resetTemp') Cancel
</template>

<script>
import { createContribution } from '@/api/simulation'
import rules from './validation-rules'
import { Notification } from 'element-ui'
import { fetchMathConfig } from '@/api/config'

export default {
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      listLoading: true,
      configSeparator: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      temp: {
        averageLifeExpectations: undefined,
        averageReturnOfInvestment: undefined,
        currentAge: undefined,
        currentSalary: undefined,
        idealReplacementRatio: undefined,
        currentPensionAssets: undefined,
        retireAge: undefined
      },
      rules
    }
  },
  created() {
    this.resetTemp()
    fetchMathConfig({ code: 'amount', type: 'separator' }).then(res => {
      if (res.length) {
        this.configSeparator.precision = res[0].value
      }
      console.log(this.configSeparator)
    })
  },
  methods: {
    createContribution() {
      const duration = 3500
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createContribution(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              Notification({
                message: 'Contribution Needed: ' + response.contributionNeeded,
                type: 'success',
                duration
              })
            }
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        averageLifeExpectations: undefined,
        averageReturnOfInvestment: undefined,
        currentAge: undefined,
        currentSalary: undefined,
        idealReplacementRatio: undefined,
        currentPensionAssets: undefined,
        retireAge: undefined
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>


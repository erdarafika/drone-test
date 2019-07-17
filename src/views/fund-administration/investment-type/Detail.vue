<template lang="pug">
app-container(:show='!objectId')
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'InvestmentType'}) }")
  el-form(ref='dataForm' :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
    el-form-item(:label="$t('investmentType.fundName')", prop='name')
      el-input(v-model='temp.name',  name='name' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' disabled)
    el-form-item(:label="$t('investmentType.code')", prop='code')
      el-input(v-model.number='temp.code',  name='code' type='input' disabled)
    el-form-item(:label="$t('investmentType.description')")
      el-input(v-model='temp.description',  name='description' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' disabled)
</template>

<script>

import { fetchInvestmentType } from '@/api/investment-type'

export default {
  props: ['objectId'],
  data() {
    return {
      temp: {
        id: undefined,
        name: undefined,
        code: undefined,
        description: undefined
      }
    }
  },
  created() {
    if (this.objectId) {
      this.temp.id = this.objectId
      this.getRecord()
    }
  },
  methods: {
    getRecord() {
      fetchInvestmentType(this.temp.id).then(res => {
        this.temp = res
      })
    }
  }
}
</script>

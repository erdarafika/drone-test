<template lang="pug">
app-container(:show='!objectId')
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'UnitPrice'}) }")
  el-form(ref='dataForm'  label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
    el-form-item(:label="$t('investmentType.effectiveDate')")
      el-input(v-model='processedEffectiveDate' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' disabled)
    el-form-item(:label="$t('unitPrice.fundName')")
      el-input(v-model='temp.investmentType.name' type='input' disabled)
    el-form-item(:label="$t('unitPrice.price')", prop='code')
      el-input(v-model.number='temp.price' type='input' disabled)
</template>

<script>

import { fetchUnitPrice } from '@/api/investment-type'
export default {
  props: ['objectId'],
  data() {
    return {
      temp: {
        id: undefined,
        effectiveDate: undefined,
        price: undefined,
        investmentType: {
          name: undefined
        }
      }
    }
  },
  computed: {
    processedEffectiveDate() {
      return this.temp.effectiveDate ? this.$moment(this.temp.effectiveDate).format('Do MMMM, YYYY') : null
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
      fetchUnitPrice(this.temp.id).then(res => {
        this.temp = res
      })
    }
  }
}
</script>

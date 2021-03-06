
<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;',)
    el-date-picker.filter-item(v-model='listQuery.date', type='date', placeholder='Pick a day' style='margin-left:  30px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

    el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
      el-form(ref='dataForm', :model='temp', label-position='top', label-width='200px', style='width: 80%; margin-left:50px;')
        el-form-item(:label="$t('investmentType.effectiveDate')", prop='effectiveDate' :rules="rules.requiredValidator")
          el-date-picker(v-model='temp.effectiveDate', type='date', placeholder='Pick a date' :picker-options="pickerOptions" :editable='false')
        el-form-item
          hr
          h3 {{$t('route.investmentType') }} - {{$t('investmentType.price')}}
        el-form-item(v-for='(domain, index) in investmentTypePrice' :key='domain.key' :label="domain.label")
          .el-input.el-input-group.el-input-group--prepend
            .el-input-group__prepend {{$t('investmentType.price')}}
            money.el-input__inner(v-model='domain.value', name='amount' v-bind='configSeparator' :disabled='["pending","active","approved"].includes(domain.status.toLowerCase())')
          //- el-input-number(v-model.number='domain.value' :precision="configSeparator" :step='1000' controls-position="right" :disabled='["pending","active","approved"].includes(domain.status.toLowerCase())')
          el-alert(v-if='domain.status' :title='domain.status', :type='unitPriceColor(domain.status)', show-icon :closable='false' style='display: initial; margin-left:20px')
      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.requestApproval') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('unitPrice.fundName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.investmentType.name }}
    el-table-column(:label="$t('unitPrice.effectiveDate')", align='left' width="150")
      template(slot-scope='scope')
        span {{ scope.row.effectiveDate | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="$t('unitPrice.price')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.price }}
    el-table-column(:label="$t('unitPrice.status')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left' width="150")
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList as fetchInvestmentTypeList, fetchUnitPriceList, createUnitPrice } from '@/api/investment-type'
import { fetchList as fetchHoliday } from '@/api/holiday'
import { fetchMathConfig } from '@/api/config'
import { requiredValidator, numberValidator } from '@/global-function/formValidator'
// import rules from './validation-rules'

export default {
  name: 'UnitPrice',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined,
        date: undefined
      },
      configSeparator: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      holiday: [],
      temp: {
        effectiveDate: undefined,
        data: []
      },
      rules: {
        requiredValidator,
        numberValidator
      },
      investmentTypePrice: [],
      dialogFormVisible: false,
      dialogStatus: '',
      dateFormat: 'Do MMMM YYYY'
    }
  },
  computed: {
    filterredList() {
      const dateFormat = this.dateFormat
      const { q, limit, page, date } = this.listQuery
      const formattedDate = date ? this.$moment(date).format(dateFormat) : date

      let listAfterSearch = this.list.filter(data => !q || data.investmentType.name.toLowerCase().includes(q.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !date || this.$moment(data.effectiveDate).format(dateFormat) === formattedDate)
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    pickerOptions() {
      const self = this
      return {
        disabledDate(time) {
          const dayKey = time.getDay()
          if (dayKey === 6 || dayKey === 0) {
            return true
          }

          const today = self.$moment().subtract(1, 'days')
          const timeToMoment = self.$moment(time)
          return timeToMoment.isAfter(today) || self.holiday.includes(self.$moment(time.getTime()).format(self.dateFormat))
        }
      }
    }
  },
  watch: {
    'temp.effectiveDate': function(newDate) {
      newDate = this.$moment(newDate).format(this.dateFormat)

      const matchUnitPriceDate = this.list.filter(item => this.$moment(item.effectiveDate).format(this.dateFormat) === newDate)

      this.investmentTypePrice.map(itemPrice => {
        const matchInvestmentType = matchUnitPriceDate.findIndex(item => item.investmentType.id === itemPrice.key)
        if (matchInvestmentType !== -1) {
          itemPrice.status = matchUnitPriceDate[matchInvestmentType].status.toUpperCase()
          itemPrice.value = matchUnitPriceDate[matchInvestmentType].price
        } else {
          itemPrice.status = ''
          itemPrice.value = 0
        }
        return itemPrice
      })
    }
  },
  created() {
    fetchHoliday().then(res => {
      this.holiday = res.map(item => this.$moment(item.date).format(this.dateFormat))
    })
    this.getInvestmentTypePrice()
    this.getList()

    fetchMathConfig({ code: 'unit_price', type: 'separator' }).then(res => {
      if (res.length) {
        this.configSeparator.precision = res[0].value
      }
      console.log(this.configSeparator)
    })
  },
  methods: {
    unitPriceColor(status) {
      status = status.toLowerCase()
      if (status === 'pending') return 'warning'
      if (status === 'active' || status === 'approved') return 'success'
      if (status === 'rejected') return 'error'
      return 'info'
    },
    getInvestmentTypePrice() {
      const DEFAULT_STATUS = ''
      fetchInvestmentTypeList().then(response => {
        response = response.filter(item => item.status === 'active')
        this.investmentTypePrice = response.map(i => ({ label: i.name, key: i.id, value: 0, status: DEFAULT_STATUS }))
      })
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else if (dialogStatus === 'add-multiple-fund') {
        return 'Add Multiple Fund Price'
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    resetTemp() {
      this.temp = {
        effectiveDate: undefined,
        data: []
      }

      this.getInvestmentTypePrice()
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
        console.log('valid', valid)
        if (valid) {
          this.temp.effectiveDate = this.$moment(this.temp.effectiveDate).format('DD-MM-YYYY')
          const dataPayload = this.investmentTypePrice.filter(item => !item.status)
          createUnitPrice({ effectiveDate: this.temp.effectiveDate, data: dataPayload }).then((response) => {
            console.log(response)

            // if (response[0].status_code >= 200 && response.status_code[0] <= 300) {
            this.successNotifier()
            this.getList()
            // }
            this.dialogFormVisible = false
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      fetchUnitPriceList().then(response => {
        console.log(response)

        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    handleFilter() {
      if (this.listQuery.date) { this.listQuery.date = this.$moment(this.listQuery.date).format('YYYY-MM-DD') }
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

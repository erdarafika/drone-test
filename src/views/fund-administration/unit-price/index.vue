
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
          el-date-picker(v-model='temp.effectiveDate', type='date', placeholder='Pick a date' )
        el-form-item
          hr
          h3 {{$t('route.investmentType') }} - {{$t('investmentType.price')}}
        el-form-item(v-for='(domain, index) in investmentTypePrice' :key='domain.key' :label="domain.label" :rules="[rules.requiredValidator, rules.numberValidator]")
          el-input(v-model='domain.value')
            template(slot='prepend') {{$t('investmentType.price')}}
        el-form-item
          el-alert(:title="$t('investmentType.unavailableMessage')", type='info', show-icon)
      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('unitPrice.fundName')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.investmentType.name }}
    el-table-column(:label="$t('unitPrice.price')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.price }}
    el-table-column(:label="$t('unitPrice.status')", align='left' width="130")
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('unitPrice.effectiveDate')", align='left' width="150")
      template(slot-scope='scope')
        span {{ scope.row.effectiveDate | moment("Do MMMM, YYYY")  }}
    el-table-column(:label="$t('table.createdDate')", align='left' width="150")
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList as fetchInvestmentTypeList, fetchUnitPriceList, createUnitPrice } from '@/api/investment-type'
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
      dialogStatus: ''
    }
  },
  computed: {
    filterredList() {
      const dateFormat = 'Do MMMM YYYY'
      const { q, limit, page, date } = this.listQuery
      const formattedDate = date ? this.$moment(date).format(dateFormat) : date

      let listAfterSearch = this.list.filter(data => !q || data.investmentType.name.toLowerCase().includes(q.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !date || this.$moment(data.effectiveDate).format(dateFormat) === formattedDate)
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getInvestmentTypePrice()
    this.getList()
  },
  methods: {
    getInvestmentTypePrice() {
      const DEFAULT_STATUS = 'UNAVAILABLE'
      fetchInvestmentTypeList().then(response => {
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

          createUnitPrice({ effectiveDate: this.temp.effectiveDate, data: this.investmentTypePrice }).then((response) => {
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

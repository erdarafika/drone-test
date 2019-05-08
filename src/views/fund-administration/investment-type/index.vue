
  <template lang="pug">
  .app-container
    .filter-container
      el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')

      el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
        | {{ $t('table.add') }}
      el-button.filter-item(style='margin-left:10px;float:right', type='primary', @click='handleCreateMultipleFundPrice' size="mini")
        | {{ $t('investmentType.addMultipleFundPrice') }}

    el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('investmentType.fundName')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.fundName }}
      el-table-column(:label="$t('investmentType.code')", align='left', width='180')
        template(slot-scope='scope')
          span {{ scope.row.code }}
      el-table-column(:label="$t('investmentType.status')", align='left', width='180')
        template(slot-scope='scope')
          span {{ scope.row.status }}
      el-table-column(:label="$t('investmentType.lastPrice')", align='left', width='180')
        template(slot-scope='scope')
          span {{ getUnitPriceData(scope.row,'last-price')  }}
      el-table-column(:label="$t('investmentType.effectiveDate')", align='left', width='180')
        template(slot-scope='scope')
          span {{ getUnitPriceData(scope.row,'effective-date')   | moment("Do MMMM, YYYY") }}
      el-table-column(:label="$t('table.createdDate')", align='left', width='200')
        template(slot-scope='scope')
          | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
    el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
        el-form-item(:label="$t('businessLine.name')", prop='name')
          el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}')
        el-form-item(:label="$t('businessLine.code')", prop='code')
          el-input(v-model.number='temp.code', type='input')

      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}
  </template>

<script>
import { fetchInvestmentTypeList, fetchUnitPriceList } from '@/api/investment-type'
import Pagination from '@/components/Pagination' // secondary package based on el-paginationp
// import { generateDate } from '@/utils/pensiunku'

export default {
  name: 'InvestmentType',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      unitPriceList: [],
      temp: {
        id: undefined,
        fundName: undefined,
        code: undefined,
        description: undefined,
        status: 'UNVERIFIED',
        isActive: undefined,
        createdDate: undefined
      },
      rules: {
        name: [{ required: true, message: 'Business name is required', trigger: 'change' }],
        code: [{ required: true, message: 'Business code is required', trigger: 'change' }, { type: 'number', message: 'Business code must be a number' }]
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    fetchUnitPriceList().then(response => {
      this.unitPriceList = response.data.items
    })
    this.getList()
  },
  methods: {
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getUnitPriceData(row, type) {
      const searchUnitPrice = this.unitPriceList.filter(i => i.investmentTypeId === row.unitId)

      if (searchUnitPrice.length) {
        if (type === 'last-price') { return searchUnitPrice[0].price } else if (type === 'effective-date') { return searchUnitPrice[0].effectiveDate }
      }

      return ''
    },
    getList() {
      this.listLoading = true
      fetchInvestmentTypeList(this.listQuery).then(response => {
        this.list = response.data.items.map((i, index) => ({ ...i, unitId: index })) // TODO: Use Better Code., unitId used to fix random id of investment type
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        code: '',
        isActive: undefined,
        createdDate: undefined
      }
    },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     console.log('valid', valid)
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       this.temp.isActive = true
    //       this.temp.createdDate = generateDate()
    //       createBusinessLine(this.temp).then(() => {
    //         this.list.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: this.$t('table.successTitle'),
    //           message: this.$t('table.successCaption'),
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    handleCreateMultipleFundPrice() {

    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
    //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateBusinessLine(tempData).then(() => {
    //         for (const v of this.list) {
    //           if (v.id === this.temp.id) {
    //             const index = this.list.indexOf(v)
    //             this.list.splice(index, 1, this.temp)
    //             break
    //           }
    //         }
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: this.$t('table.successTitle'),
    //           message: this.$t('table.successCaption'),
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // }
  }
}
</script>

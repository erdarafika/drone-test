
  <template lang="pug">
  .app-container
    .filter-container
      el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
      el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
        | {{ $t('table.add') }}

    el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('investmentType.fundName')", align='left')
        template(slot-scope='scope')
          span {{ scope.row.name }}
      el-table-column(:label="$t('investmentType.code')", align='left', width='120')
        template(slot-scope='scope')
          span {{ scope.row.code }}
      el-table-column(:label="$t('investmentType.status')", align='left', width='120')
        template(slot-scope='scope')
          span {{ scope.row.status  }}
      el-table-column(:label="$t('investmentType.lastPrice')", align='left', width='120')
        template(slot-scope='scope')
          span {{ scope.row.lastPrice  }}
      el-table-column(:label="$t('investmentType.effectiveDate')", align='left', width='180')
        template(slot-scope='scope')
          span {{ scope.row.effectiveDate | moment("Do MMMM, YYYY") }}
      el-table-column(:label="$t('table.createdDate')", align='left')
        template(slot-scope='scope')
          | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
      el-table-column(label='', align='right', class-name='small-padding fixed-width', width='230')
        template(slot-scope='{row}')
          el-button(type='primary', size='mini', @click='handleUpdate(row)')
            | {{ $t('table.edit') }}
          //- el-button(type='success', size='mini', @click='handleViewUnitPrice(row)')
          //-   | {{ $t('investmentType.pricing') }}
          el-button(type='danger', size='mini', @click='handleDelete(row)')
            | {{ $t('table.delete') }}
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
    el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
        el-form-item(:label="$t('investmentType.fundName')", prop='name')
          el-input(v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}')
        el-form-item(:label="$t('investmentType.code')", prop='code')
          el-input(v-model.number='temp.code', type='input')
        el-form-item(:label="$t('investmentType.description')")
          el-input(v-model='temp.description', type='textarea', :autosize='{ minRows: 2, maxRows: 4}')

      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}

  </template>

<script>
import { fetchList, createInvestmentType, updateInvestmentType, deleteInvestmentType } from '@/api/investment-type'
import Pagination from '@/components/Pagination' // secondary package based on el-paginationp

export default {
  name: 'InvestmentType',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp ',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      temp: {
        name: undefined,
        code: undefined,
        description: undefined
      },
      rules: {
        name: [{ required: true, message: 'Business name is required', trigger: 'change' }],
        code: [{ required: true, message: 'Business code is required', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
    this.getList()
  },
  methods: {
    // handleViewUnitPrice(row) {
    //   this.$router.push({ path: '/fund-administration/unit-price', query: {
    //     id: row.unitId
    //   }})
    // },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else if (dialogStatus === 'add-multiple-fund') {
        return 'Add Multiple Fund Price'
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
        id: undefined,
        name: '',
        code: '',
        isActive: undefined,
        createdDate: undefined
      }
    },
    resetMultiplePriceFundTemp() {
      this.tempMultipleFundPrice = {
        id: undefined,
        effectiveDate: undefined,
        investmentTypeId: this.list.map(i => i.unitId),
        price: Array.apply(null, Array(this.list.length)).map(i => null),
        isActive: undefined,
        createdDate: undefined
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
        console.log('valid', valid)
        if (valid) {
          createInvestmentType(this.temp).then((response) => {
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
          updateInvestmentType(this.temp).then((response) => {
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
        deleteInvestmentType(row).then((response) => {
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

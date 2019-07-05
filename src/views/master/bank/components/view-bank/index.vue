<template lang="pug">
  .bank-detail
    el-button(type='danger', size='mini' @click="documentDelete(data)")
      | {{ $t('table.delete') }} {{$t('route.bank')}}
    el-row
      el-col(:span='14')
        .detail-block
          table
            tr.top-bar
              td(colspan="2")
            tr
              th(width="150") {{ $t('bank.name') }}
              td {{ data.bankName }}
            tr
              th {{ $t('bank.swiftCode') }}
              td {{ data.swiftCode }}
            tr
              th {{ $t('bank.transferCode') }}
              td {{ data.transferCode }}
            tr
              th {{ $t('table.createdDate') }}
              td {{ data.created_at | moment("Do MMMM, YYYY") }}
      el-col.branch-block(:span='10')
        h3 {{$t('bank.branch')}}
        el-form(:model='temp',  :rules='rules', ref='dataForm', label-width='100px')
          el-form-item(:label='$t("bank.branchName")', prop='bankBranch')
            el-input(v-model='temp.bankBranch', autocomplete='off' name='bankBranch')
          el-form-item(:label='$t("bank.branchAddress")', prop='bankAddress')
            el-input(v-model='temp.bankAddress', autocomplete='off' name='bankAddress')
          el-form-item(:label='$t("bank.branchCountry")', prop='country')
            el-select(v-model='temp.country', name='country' placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in countryList', :key='item' :label='item', :value='item')
          el-form-item
            el-button(type='primary' @click="createData()") {{$t('table.save')}}

    el-table(:data='branches' v-loading='listLoading')
      el-table-column(property='bankBranch', :label='$t("bank.branchName")')
      el-table-column(property='bankAddress', :label='$t("bank.branchAddress")')
      el-table-column(:label='$t("bank.branchCountry")')
        template(slot-scope='scope')
          span {{ scope.row.country }}
      el-table-column(label='Created Date', width='150')
        template(slot-scope='scope')
          span {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
      el-table-column(label='', width="90")
        template(slot-scope="scope")
          Delete(:data='scope.row' :action='handleDelete')

</template>
<style lang="scss">
tr.top-bar {
  height: 50px;
}
.bank-detail {
  margin-top: -24px;
  .detail-block {
    table {
      padding-bottom: 20px;
      margin-bottom: 10px;
      width: 100%;
      text-align: left;
      th {
        padding:10px 20px 10px 0px;
      }
    }
  }
}

.branch-block {
  h3 {
    text-align: center;
    }
}
</style>

<script>
import { fetchBranch, createBranch, deleteBranch } from '@/api/bank'
import { fetchCountryList } from '@/api/location'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'ViewDocument',
  props: {
    data: Object,
    handleDocumentDelete: Function
  },
  data() {
    return {
      temp: {
        bankBranch: undefined,
        bankAddress: undefined,
        country: undefined
      },
      countryList: [],
      branches: null,
      total: null,
      listLoading: false,
      rules: {
        bankBranch: [
          requiredValidator
        ],
        bankAddress: [
          requiredValidator
        ],
        country: [
          requiredValidator
        ]
      }
    }
  },
  created() {
    this.$eventBus.$on('update-location', (data) => {
      this.getCountryOptions()
    })
    this.getList()
    this.getCountryOptions()
  },
  methods: {
    getCountryOptions() {
      fetchCountryList().then(response => {
        this.countryList = response.map(i => i.name)
      })
    },
    documentDelete(row) {
      this.handleDocumentDelete(row)
    },
    resetForm() {
      this.temp = {
        bankBranch: undefined,
        bankAddress: undefined,
        country: undefined
      }
    },
    handleDelete(row) {
      const cancelCallback = () => this.$notify({
        title: this.$t('table.cancelTitle'),
        message: this.$t('table.cancelCaption'),
        type: 'warning',
        duration: 2000
      })

      const deleteCallback = () => {
        deleteBranch(row).then((response) => {
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
    },
    getList() {
      this.listLoading = true
      fetchBranch(this.data.id).then(response => {
        this.branches = response
        this.total = response.length
        this.listLoading = false
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createBranch(this.temp, this.data.id).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
              })
              this.resetForm()
            }
            this.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>

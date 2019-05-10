<template lang="pug">
  .bank-detail
    el-button.pull-right(type='danger', size='mini' @click="handleDocumentDelete(data)")
      | {{ $t('table.delete') }} {{$t('route.bank')}}
    el-row
      el-col(:span='14')
        .detail-block
          table
            tr.top-bar
              td(colspan="2")
            tr
              th(width="150") {{ $t('bank.name') }}
              td {{ data.name }}
            tr
              th {{ $t('bank.swiftCode') }}
              td {{ data.swiftCode }}
            tr
              th {{ $t('bank.transferCode') }}
              td {{ data.transferCode }}
            tr
              th {{ $t('table.createdDate') }}
              td {{ data.createdDate | moment("Do MMMM, YYYY") }}
      el-col.branch-block(:span='10')
        h3 {{$t('bank.branch')}}
        el-form(:model='temp',  :rules='rules', ref='dataForm', label-width='100px')
          el-form-item(:label='$t("bank.branchName")', prop='name')
            el-input(v-model='temp.name', autocomplete='off')
          el-form-item(:label='$t("bank.branchAddress")', prop='address')
            el-input(v-model='temp.address', autocomplete='off')
          el-form-item(:label='$t("bank.branchCountry")', prop='countryId')
            el-select(v-model='temp.countryId', placeholder='Select', filterable, default-first-option)
              el-option(v-for='item in countryOptions', :key='item.key', :label='item.label', :value='item.key')
          el-form-item
            el-button(type='primary' @click="createData()") {{$t('table.save')}}

    el-table(:data='branches' v-loading='listLoading')
      el-table-column(property='name', :label='$t("bank.branchName")')
      el-table-column(property='address', :label='$t("bank.branchAddress")')
      el-table-column(:label='$t("bank.branchCountry")')
        template(slot-scope='scope')
          span {{ countryList[scope.row.countryId]}}
      el-table-column(label='Created Date', width='150')
        template(slot-scope='scope')
          span {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
      el-table-column(label='', width="90")
        template(slot-scope="scope")
          el-button(type='danger', size='mini' @click="handleDelete(scope.row)")
            | {{ $t('table.delete') }}

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
import { fetchBranch, createBranch } from '@/api/bank'
import { fetchCountryList } from '@/api/location'
import { generateDate } from '@/utils/pensiunku'

export default {
  name: 'ViewDocument',
  props: {
    data: Object,
    handleDocumentDelete: Function
  },
  data() {
    return {
      temp: {
        id: null,
        createdDate: null,
        name: undefined,
        address: undefined,
        countryId: undefined,
        isActive: true
      },
      countryList: [],
      countryOptions: [],
      branches: null,
      total: null,
      listLoading: false,
      rules: {
        name: [
          { required: true, message: 'Branch name is required' }
        ],
        address: [
          { required: true, message: 'Branch address is required' }
        ],
        countryId: [
          { required: true, message: 'Branch country is required' }
        ]
      }
    }
  },
  created() {
    this.getBranches()
    fetchCountryList({ page: 1, limit: 50 }).then(response => {
      this.countryList = response.data.items.map(i => i.name)
      this.countryOptions = this.countryList.map((i, index) => ({ label: i, key: index }))
      console.log(this.countryOptions)
    })
  },
  methods: {
    resetForm() {
      this.temp = {
        id: null,
        createdDate: null,
        name: undefined,
        address: undefined,
        countryId: undefined,
        isActive: true
      }
    },
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.branches.indexOf(row)
      this.branches.splice(index, 1)
    },
    getBranches() {
      this.listLoading = true
      fetchBranch().then(response => {
        this.branches = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createBranch(this.temp).then(() => {
            this.branches.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })

            this.resetForm()
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          })
        }
      })
    }
  }
}
</script>

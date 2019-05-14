
<template lang="pug">
.app-container
  .filter-container
    //- el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')

    el-table-column(:label="$t('dplkAddress.addressType')", align='left', )
      template(slot-scope='scope')
        span {{ addressTypeList[scope.row.addressTypeId] }}
    el-table-column(:label="$t('dplkAddress.country')", align='left', width="180")
      template(slot-scope='scope')
        span {{ countryList[scope.row.countryId] }}
    el-table-column(:label="$t('dplkAddress.city')", align='left', width="180")
      template(slot-scope='scope')
        span {{ cityList[scope.row.cityId] }}
    el-table-column(:label="$t('dplkAddress.postalCode')", align='left', width="120")
      template(slot-scope='scope')
        span {{ scope.row.postalCode }}
    el-table-column(:label="$t('dplkAddress.status')", align='left', width="80")
      template(slot-scope='scope')
        span(:class="scope.row.id === defaultId ?'label-enable':''")
          | {{ scope.row.id === defaultId ? 'Default':'' }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right',  width='280')
      template(slot-scope='{row}')
        el-button(type='success', size='mini', @click='setDefault(row)' :disabled="defaultId===row.id" v-if="checkCrudPermission(['maker'])")
          | {{ $t('dplkAddress.setDefault')  }}
        el-button(type='primary', size='mini', @click='handleUpdate(row)' v-if="checkCrudPermission(['maker'])")
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)' v-if="checkCrudPermission(['maker'])")
          | {{ $t('table.delete') }}
        el-button(type='success', size='mini' v-if="checkCrudPermission(['approver'])")
          | {{ $t('table.approve') }}
        el-button(type='warning', size='mini' v-if="checkCrudPermission(['approver'])")
          | {{ $t('table.reject') }}

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkAddress.postalCode')", prop='postalCode')
        el-input(v-model.number='temp.postalCode', type='input')
      el-form-item(:label="$t('dplkAddress.addressType')", prop='addressTypeId')
        el-select(v-model='temp.addressTypeId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in addressTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.country')", prop='countryId')
        el-select(v-model='temp.countryId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in countryOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.city')", prop='cityId')
        el-select(v-model='temp.cityId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in cityOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkAddress, updateDplkAddress } from '@/api/dplk-address'
import { fetchList as fetchListAddressTypeList } from '@/api/address-type'
import { fetchCountryList, fetchCityList } from '@/api/location'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'
import crudPermission from '@/directive/crud-permission/index.js'
import checkCrudPermission from '@/utils/crud-permission'

export default {
  name: 'Document',
  directives: { crudPermission },
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      defaultId: -1,
      addressTypeList: [],
      addressTypeOptions: [],
      countryList: [],
      countryOptions: [],
      cityList: [],
      cityOptions: [],
      temp: {
        id: undefined,
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        isDefault: false,
        isActive: undefined,
        createdDate: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        addressTypeId: [{ required: true, message: 'This field is required' }],
        countryId: [{ required: true, message: 'This field is required' }],
        cityId: [{ required: true, message: 'This field is required' }],
        postalCode: [{ required: true, message: 'This field is required' }, { type: 'number', message: 'This field must be number' }],
        isDefault: [{ required: true, message: 'This field is required' }]
      }
    }
  },
  created() {
    fetchListAddressTypeList({
      page: 1,
      limit: 100
    }).then(response => {
      this.addressTypeList = response.data.items.map(i => i.type)
      this.addressTypeOptions = this.addressTypeList.map((i, index) => ({ label: i, value: index }))
      fetchCountryList({
        page: 1,
        limit: 33
      }).then(responseCounties => {
        this.countryList = responseCounties.data.items.map(i => i.name)
        this.countryOptions = this.countryList.map((i, index) => ({ label: i, value: index }))
        fetchCityList({
          page: 1,
          limit: 400
        }).then(responseCities => {
          this.cityList = responseCities.data.items.map(i => i.name)
          this.cityOptions = this.cityList.map((i, index) => ({ label: i, value: index }))
          this.getList()
        })
      })
    })
  },
  methods: {
    checkCrudPermission,
    setDefault(row) {
      this.defaultId = row.id
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        if (this.defaultId === -1) { this.defaultId = this.list[Math.floor(Math.random() * this.list.length)].id }
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
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        isDefault: false,
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createDplkAddress(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateDplkAddress(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>

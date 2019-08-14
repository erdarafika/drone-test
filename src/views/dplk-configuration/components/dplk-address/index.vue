
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    //- el-table-column(:label="$t('dplkAddress.name')", align='left', )
    //-   template(slot-scope='scope')
    //-     span {{ scope.row.name }}
    el-table-column(:label="$t('dplkAddress.addressType')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.addressType.type }}
    el-table-column(:label="$t('dplkAddress.country')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.country.name }}
    el-table-column(:label="$t('dplkAddress.city')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.city.name }}
    el-table-column(:label="$t('dplkAddress.postalCode')", align='left', width="120")
      template(slot-scope='scope')
        span {{ scope.row.postalCode }}
    //- el-table-column(:label="$t('dplkAddress.status')", align='left', width="80")
    //-   template(slot-scope='scope')
    //-     span(:class="scope.row.id === defaultId ?'label-enable':''")
    //-       | {{ scope.row.id === defaultId ? 'Default':'' }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    //- el-table-column(:label="$t('table.status')", align='left', width='190')
    //-   template(slot-scope='scope')
    //-     RecordStatus(:status="scope.row.status")
    el-table-column(label='', align='right',  )
      template(slot-scope='{row}')
        //- el-button(type='success', size='mini', @click='setDefault(row)' :disabled="defaultId===row.id" )
        //-   | {{ $t('dplkAddress.setDefault')  }}

        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      //- el-form-item(:label="$t('dplkAddress.name')", prop='name')
      //-   el-input(v-model.number='temp.name', type='input' name='name')
      el-form-item(:label="$t('dplkAddress.addressType')", prop='addressTypeId')
        el-select(v-model='temp.addressTypeId', name='addressTypeId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in addressTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.country')", prop='countryId')
        el-select(v-model='temp.countryId', name='countryId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in countryOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.province')", prop='provinceId')
        el-select(v-model='temp.provinceId' name='provinceId', placeholder='Select', filterable, default-first-option :disabled='temp.countryId === undefined')
          el-option(v-for='item in provinceOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.city')", prop='cityId')
        el-select(v-model='temp.cityId', name='cityId'  placeholder='Select', filterable, default-first-option  :disabled='temp.provinceId === undefined')
          el-option(v-for='item in cityOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.postalCode')", prop='postalCode')
        el-input(v-model.number='temp.postalCode', name='postalCode' type='input')
      el-form-item(:label="$t('dplkAddress.address1')", prop='address1' )
        el-input(v-model='temp.address1',  name='address1' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
      el-form-item(:label="$t('dplkAddress.address2')", prop='address2' )
        el-input(v-model='temp.address2',  name='address2' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
      el-form-item(:label="$t('dplkAddress.address3')", prop='address3' )
        el-input(v-model='temp.address3',  name='address3' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')
      el-form-item(:label="$t('dplkAddress.address4')", prop='address4' )
        el-input(v-model='temp.address4',  name='address4' type='textarea', :autosize='{ minRows: 1, maxRows: 2}')

    .dialog-footer(slot='footer' )
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkAddress, updateDplkAddress, deleteDplkAddress } from '@/api/dplk-address'
import { fetchList as fetchAddressTypeList } from '@/api/address-type'
import { fetchCountryList, fetchProvinceListById, fetchCityListById } from '@/api/location'
import Pagination from '@/components/Pagination'
import rules from './validation-rules'

export default {
  name: 'Document',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      defaultId: -1,
      addressTypeOptions: [],
      countryOptions: [],
      provinceOptions: [],
      cityOptions: [],
      temp: {
        // name: undefined,
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        provinceId: undefined,
        address1: undefined,
        address2: undefined,
        address3: undefined,
        address4: undefined
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.address1.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    location() {
      return this.provinceOptions && this.cityOptions && this.countryOptions
    }
  },
  watch: {
    'temp.countryId': function(countryId) {
      if (!this.initialUpdate) {
        this.temp.provinceId = undefined
        this.temp.cityId = undefined
      }
      if (countryId) {
        fetchProvinceListById(countryId).then(res => {
          this.provinceOptions = res.map(province => ({ value: province.id, label: province.name }))
        })
      }
    },
    'temp.provinceId': function(provinceId) {
      if (!this.initialUpdate) {
        this.temp.cityId = undefined
      }
      if (provinceId) {
        fetchCityListById({ provinceId, countryId: this.temp.countryId }).then(res => {
          this.cityOptions = res.map(city => ({ value: city.id, label: city.name }))
        })
      }
    },
    location() {
      if (this.provinceOptions && this.countryOptions && this.cityOptions) { this.initialUpdate = false }
    }

  },
  created() {
    this.getCountryAddress()
  },
  methods: {
    getCountryAddress() {
      fetchCountryList().then(res => {
        this.countryOptions = res.map(country => ({ value: country.id, label: country.name }))
      })

      fetchAddressTypeList().then(res => {
        this.addressTypeOptions = res.map(address => ({ value: address.id, label: address.type }))
      })

      this.getList()
    },
    handleApprove(row) {
      row.status = 1
      for (const v of this.list) {
        if (v.id === row.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, row)
          break
        }
      }
      this.dialogFormVisible = false
      this.successNotifier()
    },
    handleReject(row) {
      row.status = 2
      for (const v of this.list) {
        if (v.id === row.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, row)
          break
        }
      }
      this.dialogFormVisible = false
      this.successNotifier()
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
        console.log(response)

        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        // name: undefined,
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        provinceId: undefined,
        address1: undefined,
        address2: undefined,
        address3: undefined,
        address4: undefined
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
        if (valid) {
          createDplkAddress(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        postalCode: row.postalCode,
        name: row.name,
        countryId: row.country.id,
        provinceId: row.province.id,
        cityId: row.city.id,
        addressTypeId: row.addressType.id,
        address1: row.address1,
        address2: row.address2,
        address3: row.address3,
        address4: row.address4
      }
      this.initialUpdate = true
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
          updateDplkAddress(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteDplkAddress(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

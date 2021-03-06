
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('companyAddress.addressType')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.addressType.type }}
    el-table-column(:label="$t('companyAddress.address1')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.address1 }}
    el-table-column(:label="$t('companyAddress.city')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.city.name }}
    el-table-column(:label="$t('companyAddress.status')", align='left',)
      template(slot-scope='scope')
        span(:class="scope.row.defaultAddress ?'label-enable':''")
          | {{ scope.row.defaultAddress ? 'Default':'' }}
    el-table-column(label='', align='right', width='150' )
      template(slot-scope='{row}')
        //- el-button(type='success', size='mini', @click='setDefault(row)' :disabled="defaultId===row.id" )
        //-   | {{ $t('companyAddress.setDefault')  }}

        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('companyAddress.addressType')", prop='addressTypeId')
        el-select(v-model='temp.addressTypeId', name='addressTypeId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in addressTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyAddress.address1')", prop='address1')
        el-input(v-model.number='temp.address1', name='address1' type='input')
      el-form-item(:label="$t('companyAddress.address2')", prop='address2')
        el-input(v-model.number='temp.address2', name='address2' type='input')
      el-form-item(:label="$t('companyAddress.address3')", prop='address3')
        el-input(v-model.number='temp.address3', name='address3' type='input')
      el-form-item(:label="$t('companyAddress.address4')", prop='address4')
        el-input(v-model.number='temp.address4', name='address4' type='input')
      el-form-item(:label="$t('companyAddress.country')", prop='countryId')
        el-select(v-model='temp.countryId', name='countryId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in countryOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyAddress.province')", prop='provinceId')
        el-select(v-model='temp.provinceId', name='provinceId' placeholder='Select', filterable, default-first-option  :disabled='temp.countryId === undefined')
          el-option(v-for='item in provinceOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyAddress.city')", prop='cityId')
        el-select(v-model='temp.cityId', name='cityId' placeholder='Select', filterable, default-first-option  :disabled='temp.provinceId === undefined')
          el-option(v-for='item in cityOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyAddress.district')", prop='district')
        el-input(v-model.number='temp.district', name='distric' type='input')
      el-form-item(:label="$t('companyAddress.postalCode')", prop='postalCode')
        el-input(v-model.number='temp.postalCode', name='postalCode' type='input')
      el-form-item(:label="$t('companyAddress.status')")
        el-switch(v-model='temp.defaultAddress' name='defaultAddress')
        span.switch-status {{ temp.defaultAddress?'Default':'Not Default' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createCompanyAddress, updateCompanyAddress, deleteCompanyAddress } from '@/api/company-address'
import { fetchList as fetchAddressTypeList } from '@/api/address-type'
import { fetchCountryList, fetchProvinceListById, fetchCityListById } from '@/api/location'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator, alphabeticValidator, alphanumericDotComaValidator } from '@/global-function/formValidator'

export default {
  name: 'Document',
  components: { Pagination },
  props: ['data'],
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      defaultId: -1,
      addressTypeOptions: [],
      countryOptions: [],
      provinceOptions: [],
      cityOptions: [],
      temp: {
        address1: undefined,
        address2: undefined,
        address3: undefined,
        address4: undefined,
        cityId: undefined,
        provinceId: undefined,
        countryId: undefined,
        district: undefined,
        postalCode: undefined,
        addressTypeId: undefined,
        defaultAddress: false
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        district: [requiredValidator, alphabeticValidator],
        address1: [requiredValidator, alphanumericDotComaValidator],
        address2: [requiredValidator, alphanumericDotComaValidator],
        address3: [alphanumericDotComaValidator],
        address4: [alphanumericDotComaValidator],
        addressTypeId: [requiredValidator],
        countryId: [requiredValidator],
        cityId: [requiredValidator],
        provinceId: [requiredValidator],
        postalCode: [requiredValidator],
        defaultAddress: [requiredValidator]
      }
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
    },
    'data.id': function(value) {
      if (value !== undefined) { this.getCountryAddress() }
    }
  },
  created() {
    this.$eventBus.$on('update-location', (data) => {
      this.getCountryAddress()
    })

    if (this.data.id) { this.getCountryAddress() }
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
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.data.id).then(response => {
        console.log(response)

        this.list = response
        this.total = response.length

        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        address1: undefined,
        address2: undefined,
        address3: undefined,
        address4: undefined,
        cityId: undefined,
        provinceId: undefined,
        countryId: undefined,
        district: undefined,
        postalCode: undefined,
        addressTypeId: undefined,
        defaultAddress: false
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
          this.temp['companyId'] = this.data.id
          createCompanyAddress(this.temp).then((response) => {
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
        companyId: this.data.id,
        id: row.id,
        postalCode: row.postalCode,
        district: row.district,
        defaultAddress: row.defaultAddress,
        address1: row.address1,
        address2: row.address2,
        address3: row.address3,
        address4: row.address4,
        countryId: row.country.id,
        provinceId: row.province.id,
        cityId: row.city.id,
        addressTypeId: row.addressType.id
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
          updateCompanyAddress(tempData).then((response) => {
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
      row['companyId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteCompanyAddress(row).then((response) => {
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

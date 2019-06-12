
<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('dplkAddress.name')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.name }}
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
        el-button(type='primary', size='mini', @click='handleUpdate(row)' )
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)' )
          | {{ $t('table.delete') }}

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('dplkAddress.name')", prop='name')
        el-input(v-model.number='temp.name', type='input')
      el-form-item(:label="$t('dplkAddress.postalCode')", prop='postalCode')
        el-input(v-model.number='temp.postalCode', type='input')
      el-form-item(:label="$t('dplkAddress.addressType')", prop='addressTypeId')
        el-select(v-model='temp.addressTypeId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in addressTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.country')", prop='countryId')
        el-select(v-model='temp.countryId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in countryOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.province')", prop='provinceId')
        el-select(v-model='temp.provinceId', placeholder='Select', filterable, default-first-option  :disabled='temp.countryId === undefined')
          el-option(v-for='item in provinceOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('dplkAddress.city')", prop='cityId')
        el-select(v-model='temp.cityId', placeholder='Select', filterable, default-first-option  :disabled='temp.provinceId === undefined')
          el-option(v-for='item in cityOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDplkAddress, updateDplkAddress, deleteDplkAddress } from '@/api/dplk-address'
import { fetchList as fetchAddressTypeList } from '@/api/address-type'
import { fetchCountryList, fetchProvinceListById, fetchCityListById } from '@/api/location'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import crudPermission from '@/directive/crud-permission/index.js'
// import checkCrudPermission from '@/utils/crud-permission'
// import RecordStatus from '@/components/RecordStatus'

export default {
  name: 'Document',
  // directives: { crudPermission },
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
        name: undefined,
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        provinceId: undefined
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'This field is required' }],
        addressTypeId: [{ required: true, message: 'This field is required' }],
        countryId: [{ required: true, message: 'This field is required' }],
        cityId: [{ required: true, message: 'This field is required' }],
        provinceId: [{ required: true, message: 'This field is required' }],
        postalCode: [{ required: true, message: 'This field is required' }],
        isDefault: [{ required: true, message: 'This field is required' }]
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
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
    fetchCountryList().then(res => {
      this.countryOptions = res.map(country => ({ value: country.id, label: country.name }))
    })

    fetchAddressTypeList().then(res => {
      this.addressTypeOptions = res.map(address => ({ value: address.id, label: address.type }))
    })

    this.getList()
  },
  methods: {
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
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
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
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
    },
    // checkCrudPermission,
    // setDefault(row) {
    //   this.defaultId = row.id
    //   this.$notify({
    //     title: this.$t('table.successTitle'),
    //     message: this.$t('table.successCaption'),
    //     type: 'success',
    //     duration: 2000
    //   })
    // },
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

        if (this.defaultId === -1) { this.defaultId = this.list[Math.floor(Math.random() * this.list.length)].id }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        addressTypeId: undefined,
        countryId: undefined,
        cityId: undefined,
        postalCode: undefined,
        provinceId: undefined

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
      this.temp = {
        id: row.id,
        postalCode: row.postalCode,
        name: row.name,
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
          updateDplkAddress(tempData).then((response) => {
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
      deleteDplkAddress(row).then((response) => {
        console.log(response)

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
  }
}
</script>


<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='list.filter(data => !listQuery.q || data.name.toLowerCase().includes(listQuery.q.toLowerCase()))', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('location.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('location.province')", align='left')
      template(slot-scope='scope')
        span {{ provinceOptions.filter(i => i.value === scope.row.provinceId)[0].label }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)')
          | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='100px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('location.name')", prop='name')
        el-input(v-model='temp.name')
      el-form-item(:label="$t('location.province')", prop='provinceId')
        el-select(v-model='temp.provinceId', placeholder='Select', filterable, default-first-option :disabled="dialogStatus==='update'")
          el-option(v-for='item in provinceOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchCityList, fetchProvinceList, fetchCountryList, createCity, updateCity, deleteCity } from '@/api/location'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Country',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      provinceOptions: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      temp: {
        provinceId: undefined,
        name: undefined,
        countryId: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'City name is required', trigger: 'change' }],
        provinceId: [{ required: true, message: 'Province is required', trigger: 'change' }]
      },
      provinceIdList: null,
      countryIdList: null
    }
  },
  created() {
    this.listLoading = true

    fetchCountryList().then(response => {
      this.countryIdList = response.map(i => i.id)
      fetchProvinceList(this.countryIdList).then(response => {
        response = [].concat.apply([], response)
        this.provinceIdList = response.map(i => ({ provinceId: i.id, countryId: i.countryId }))
        this.provinceOptions = response.map(({ id, name }) => ({ label: name, value: id }))
        this.getList()
      })
    })
  },
  methods: {
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchCityList(this.provinceIdList).then(response => {
        response = [].concat.apply([], response)
        this.list = response
        this.total = response.length
        // // Just to simulate the time of the request
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
        name: undefined,
        provinceId: undefined,
        countryId: undefined
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
          this.temp.countryId = this.provinceIdList.filter(i => i.provinceId === this.temp.provinceId)[0].countryId

          createCity(this.temp).then((response) => {
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
      console.log(row)
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
          this.temp.countryId = this.provinceIdList.filter(i => i.provinceId === this.temp.provinceId)[0].countryId
          const tempData = Object.assign({}, this.temp)
          updateCity(tempData).then((response) => {
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
      deleteCity(row).then((response) => {
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

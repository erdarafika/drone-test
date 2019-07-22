
<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.go(-1) }")
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('location.city')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='100px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('location.name')", prop='name')
        el-input(v-model='temp.name' name='name')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchCityList, createCity, updateCity, deleteCity } from '@/api/location'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { alphabeticValidator, requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Country',
  components: { Pagination },
  data() {
    return {
      id: undefined,
      tableKey: 0,
      list: [],
      countryOptions: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      countryIdList: null,
      temp: {
        countryId: undefined,
        provinceId: undefined,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator, alphabeticValidator]
      }
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
    if (this.$route.params.hasOwnProperty('id') && this.$route.params.hasOwnProperty('provinceId')) {
      this.id = this.$route.params.id
      this.provinceId = this.$route.params.provinceId
      this.temp.countryId = this.id
      this.temp.provinceId = this.provinceId
      this.getList()
    }
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
      fetchCityList(this.id, this.provinceId).then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        countryId: this.id
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
          createCity({ ...this.temp, countryId: this.id, provinceId: this.provinceId }).then((response) => {
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
          updateCity({ ...this.temp, countryId: this.id, provinceId: this.provinceId }).then((response) => {
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
        deleteCity({ ...this.temp, countryId: this.id, provinceId: this.provinceId }).then((response) => {
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

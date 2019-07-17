<template lang="pug">
app-container
  .table-header
    el-row
      el-col(:span='20')
        h2.title  List Of Groups
      el-col(:span='4')
        el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
          | {{ $t('table.add') }}
  .complex-filter-container
    .complex-filter-item
      .title | {{ $t('table.filter') }}
      el-form(label-position='left')
        el-form-item(:label="$t('table.status')")
          el-radio-group(v-model='listQuery.status')
            el-radio(v-for='option in statusOptions'  :key='option.value' :label='option.value') {{ option.label }}
      el-form(:inline='true')
        el-form-item(:label="$t('groupMaintenance.name')")
          el-input.filter-item(v-model='listQuery.name', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('groupMaintenance.productType')")
          el-select(placeholder='Select' v-model='listQuery.productType' name='productTypeId')
            el-option(v-for='item in productTypeOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(:label="$t('groupMaintenance.code')")
          el-input.filter-item(v-model='listQuery.code', prefix-icon='el-icon-search', style='width: 200px;')
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('groupMaintenance.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('groupMaintenance.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('groupMaintenance.productType')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.productType.name }}
    el-table-column(:label="$t('groupMaintenance.status')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
        Edit(:data='row' :action='handleUpdate')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
</template>

<style>
.multi-form {
  padding: 10px;
}
.pane .el-tab-pane {
  padding: 15px;
  padding-left: 20px;
}

.company-information-form .el-form-item--medium .el-form-item__label {
  line-height: 10px !important;
}
</style>

<script>
import { fetchList } from '@/api/group-maintenance'
import { fetchList as fetchProductType } from '@/api/product-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Company',
  components: { Pagination },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableKey: 0,
      list: [],
      productTypeOptions: [],
      statusOptions: [
        { label: 'Show All', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Terminated', value: 'terminated' }
      ],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        productType: undefined,
        code: undefined,
        name: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { status, name, productType, code, limit, page } = this.listQuery
      let listAfterSearch = this.list
      listAfterSearch = listAfterSearch.filter(data => !name || String(data.name).toLowerCase().includes(name.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !status || String(data.status).toLowerCase().includes(status.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !productType || String(data.productType.name).toLowerCase() === productType.toLowerCase())
      listAfterSearch = listAfterSearch.filter(data => !code || String(data.code).toLowerCase().includes(code.toLowerCase()))

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    fetchProductType().then(res => {
      this.productTypeOptions = res.map(productType => ({ value: productType.name, label: productType.name }))
    })
    this.getList()
  },
  methods: {
    handleUpdate(row) {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'update' }, query: { id: row.id }})
    },
    handleDetail(row) {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'GroupMaintenanceDetail', params: { action: 'create' }})
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    }
  }
}
</script>

<template lang="pug">
app-container
  .table-header
    el-row
      el-col(:span='20')
        h2.title List Of Companies
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
        el-form-item(:label="$t('companyInformation.name')")
          el-input.filter-item(v-model='listQuery.name', prefix-icon='el-icon-search' style='width: 200px;')
        el-form-item(:label="$t('companyInformation.email')")
          el-input.filter-item(v-model='listQuery.email', prefix-icon='el-icon-search', style='width: 200px;')
        el-form-item(:label="$t('companyInformation.code')")
          el-input.filter-item(v-model='listQuery.code', prefix-icon='el-icon-search', style='width: 200px;')

  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('companyInformation.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('companyInformation.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('companyInformation.email')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.email }}
    el-table-column(:label="$t('companyInformation.website')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.website }}
    el-table-column(:label="$t('table.status')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.status }}
    //- el-table-column(:label="$t('table.createdDate')", align='left', width='200')
    //-   template(slot-scope='scope')
    //-     | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Detail(:data='row' :action='handleDetail')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

</template>

<style lang='scss'>
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
import { fetchList } from '@/api/company'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Company',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      statusOptions: [
        { label: 'Show All', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Terminated', value: 'terminated' }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        email: undefined,
        code: undefined,
        name: undefined
      }
    }
  },
  computed: {
    filterredList() {
      const { status, name, email, code, limit, page } = this.listQuery
      let listAfterSearch = this.list
      listAfterSearch = listAfterSearch.filter(data => !name || String(data.name).toLowerCase().includes(name.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !status || String(data.status).toLowerCase().includes(status.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !email || String(data.email).toLowerCase().includes(email.toLowerCase()))
      listAfterSearch = listAfterSearch.filter(data => !code || String(data.code).toLowerCase().includes(code.toLowerCase()))

      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleUpdate(row) {
      this.$router.push({ name: 'CompanyDetail', params: { action: 'update' }, query: { id: row.id }})
    },
    handleDetail(row) {
      this.$router.push({ name: 'CompanyDetail', params: { action: 'detail' }, query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ name: 'CompanyDetail', params: { action: 'create' }})
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

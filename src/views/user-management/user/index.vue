<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('user.username')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.username }}
    el-table-column(:label="$t('user.role')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.role }}
    el-table-column(:label="$t('user.email')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.dplkStaff.email }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('table.status')", align='left', width='90')
      template(slot-scope='scope')
        span(:class="scope.row.enabled?'label-enable':'label-disable'")
          | {{ scope.row.enabled? 'Enable': 'Disable' }}
    el-table-column(label='', align='right', class-name='small-padding' width='150px')
      template(slot-scope='{row}')
        //- Detail(:data='row' :action='handleDetail')
        Authorization(:data='row' :action='handleUpdatePrivileges')
        Terminate(:data='row' :action='handleDisable' v-show='row.enabled')

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('user.staff')" prop='dplkStaffId')
        el-select(v-model='temp.dplkStaffId', name='dplkStaffId' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in staffOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('user.password')" prop='password')
        el-input(v-model.number='temp.password', name='password' type='password')
      el-form-item(:label="$t('user.confirmPassword')" prop='confirmPassword')
        el-input(v-model.number='temp.confirmPassword', name='confirmPassword' type='password')
      el-form-item(:label="$t('user.status')")
        el-switch(v-model='temp.enabled' name='enabled')
        span.switch-status {{ temp.enabled?'Active':'Not Active' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createUser, disableUser } from '@/api/user-management'
import { fetchList as fetchStaffList } from '@/api/dplk-staff'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AddressType',
  components: { Pagination },
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
      statusOptions: [{ value: true, label: ' enable' }, { value: false, label: ' disable' }],
      temp: {
        dplkStaffId: undefined,
        password: undefined,
        confirmPassword: undefined,
        enabled: true,
        menus: [],
        roles: []
      },
      staffOptions: [],
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    rules() {
      const message = 'this field is required'
      return {
        dplkStaffId: [{ required: true, message }],
        password: [{ required: true, message }],
        confirmPassword: [{ required: true, message }],
        menus: [{ required: true, message }],
        roles: [{ required: true, message }]
      }
    },
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.username.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
    fetchStaffList().then(res => {
      this.staffOptions = res.map(staff => ({ value: staff.id, label: staff.name }))
    })
  },
  methods: {
    handleUpdatePrivileges(row) {
      this.$router.push({ name: 'userPrivileges', query: { id: row.id }})
    },
    handleDisable(row) {
      disableUser(row).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.getList()
        }
      })
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    handleDetail(row) {
      console.log('detail')
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        dplkStaffId: undefined,
        password: undefined,
        confirmPassword: undefined,
        enabled: true,
        menus: [],
        roles: []
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
          console.log(this.temp)
          createUser(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>

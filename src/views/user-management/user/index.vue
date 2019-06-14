<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('user.username')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.username }}
    //- el-table-column(:label="$t('user.name')", align='left')
    //-   template(slot-scope='scope')
    //-     span {{ scope.row.dplkStaff.name }}
    el-table-column(:label="$t('user.role')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.role }}
    el-table-column(:label="$t('user.email')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.dplkStaff.email }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        span(:class="scope.row.enabled?'label-enable':'label-disable'")
          | {{ scope.row.enabled? 'Enable': 'Disable' }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        el-button(type='success', size='mini', @click='handleDetail(row)')
          | {{ $t('table.detail') }}

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')

  el-dialog(:title='`Detail`', :visible.sync='dialogDetailVisible')
    el-form(:model='viewTemp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('user.username')")
        | {{ viewTemp.username }}
      el-form-item(:label="$t('user.role')")
        | {{ viewTemp.role }}
      el-form-item(:label="$t('user.email')")
        | {{ viewTemp.email }}
      el-form-item(:label="$t('user.status')")
        span(:class="viewTemp.status?'label-enable':'label-disable'")
          | {{ viewTemp.status? 'Enable': 'Disable' }}
      el-form-item(:label="$t('user.authorities')")
        span(v-for="authority in authoritiesList"  :class="viewTemp.authorities.includes(authority)?'label-enable':'label-disable'" v-if='viewTemp.authorities')
          | {{ authority }} &nbsp;
          br
      el-form-item(:label="$t('user.menu')")
        span(v-for="menu in menuList"  :class="viewTemp.menu.includes(menu.toLowerCase())?'label-enable':'label-disable'" v-if='viewTemp.menu')
          | {{ menu }} &nbsp;
          br

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('user.staff')" prop='dplkStaffId')
        el-select(v-model='temp.dplkStaffId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in staffOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('user.password')" prop='password')
        el-input(v-model.number='temp.password', type='password')
      el-form-item(:label="$t('user.confirmPassword')" prop='confirmPassword')
        el-input(v-model.number='temp.confirmPassword', type='password')
      el-form-item(:label="$t('user.status')")
        el-switch(v-model='temp.enabled')
        span.switch-status {{ temp.enabled?'Active':'Not Active' }}
      el-form-item(:label="$t('user.authorities')" prop='roles')
        el-checkbox(:indeterminate='authoritiesIsIndeterminate', v-model='authoritiesCheckAll', @change='handleCheckAllAuthoritiesChange') Check all
        div(style='margin: 15px 0;')
        el-checkbox-group(v-model='temp.roles', @change='handleCheckedAuthoritiesChange')
          el-checkbox(v-for='authority in authoritiesList', :label='authority', :key='authority') {{authority}}

      el-form-item(:label="$t('user.menu')" prop='menus')
        el-checkbox(:indeterminate='menuIsIndeterminate', v-model='menuCheckAll', @change='handleCheckAllMenusChange') Check all
        div(style='margin: 15px 0;')
        el-checkbox-group(v-model='temp.menus', @change='handleCheckedMenusChange')
          el-checkbox(v-for='menu in menuList', :label='menu', :key='menu') {{menu}}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createUser } from '@/api/user-management'
import { fetchAuthorities, fetchMenus } from '@/api/app-const'
import { fetchList as fetchStaffList } from '@/api/dplk-staff'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AddressType',
  components: { Pagination },
  data() {
    return {
      authoritiesCheckAll: false,
      authoritiesIsIndeterminate: false,
      menuCheckAll: false,
      menuIsIndeterminate: false,
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
      viewTemp: {
        username: undefined,
        name: undefined,
        role: undefined,
        email: undefined,
        status: undefined,
        authorities: undefined,
        menu: undefined
      },
      authoritiesList: [],
      menuList: [],
      staffOptions: [],
      dialogFormVisible: false,
      dialogDetailVisible: false,
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
    this.authoritiesList = fetchAuthorities()
    this.menuList = fetchMenus()
    fetchStaffList().then(res => {
      this.staffOptions = res.map(staff => ({ value: staff.id, label: staff.name }))
    })
  },
  methods: {
    handleCheckAllAuthoritiesChange(val) {
      this.temp.roles = val ? this.authoritiesList : []
      this.authoritiesIsIndeterminate = false
    },
    handleCheckedAuthoritiesChange(value) {
      const checkedCount = value.length
      this.authoritiesCheckAll = checkedCount === this.authoritiesList.length
      this.authoritiesIsIndeterminate = checkedCount > 0 && checkedCount < this.authoritiesList.length
    },
    handleCheckAllMenusChange(val) {
      this.temp.menus = val ? this.menuList : []
      this.menuIsIndeterminate = false
    },
    handleCheckedMenusChange(value) {
      const checkedCount = value.length
      this.menuCheckAll = checkedCount === this.menuList.length
      this.menuIsIndeterminate = checkedCount > 0 && checkedCount < this.menuList.length
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    handleDetail(row) {
      this.dialogDetailVisible = true
      this.viewTemp = {
        username: row.username,
        name: row.dplkStaff.name,
        role: row.role,
        email: row.dplkStaff.email,
        status: row.enabled,
        authorities: row.authorities ? row.authorities.map(authority => authority.role) : [],
        menu: row.menus ? row.menus.map(menu => menu.menu.toLowerCase()) : []
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
          // console.log(this.temp);
          createUser(this.temp).then((response) => {
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
    }
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       updateAddressType(this.temp).then((response) => {
    //         this.dialogFormVisible = false
    //         if (response.status_code >= 200 && response.status_code <= 300) {
    //           this.$notify({
    //             title: this.$t('table.successTitle'),
    //             message: this.$t('table.successCaption'),
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.getList()
    //         }
    //       })
    //     }
    //   })
    // },
    // handleDelete(row) {
    //   deleteAddressType(row).then((response) => {
    //     this.dialogFormVisible = false
    //     this.$notify({
    //       title: this.$t('table.successTitle'),
    //       message: this.$t('table.successCaption'),
    //       type: 'success',
    //       duration: 2000
    //     })
    //     this.getList()
    //   })
    // }
  }
}
</script>

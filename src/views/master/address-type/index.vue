<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('addressType.type')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('addressType.displayOnMember')", align='left', width='180')
      template(slot-scope='scope')
        span(:class="scope.row.isMemberAddress?'label-enable':'label-disable'")
          | {{ scope.row.isMemberAddress? 'Enable': 'Disable' }}
    el-table-column(:label="$t('addressType.displayOnCompany')", align='left', width='190')
      template(slot-scope='scope')
        span(:class="scope.row.isCompanyAddress?'label-enable':'label-disable'")
          | {{ scope.row.isCompanyAddress? 'Enable': 'Disable' }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)')
          | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('addressType.type')", prop='type')
        el-input(v-model='temp.type', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' )
      el-form-item(:label="$t('addressType.displayOnMember')" prop="isMemberAddress")
        el-switch(v-model='temp.isMemberAddress')
        span.switch-status {{ temp.isMemberAddress?'Enabled':'Disabled' }}
      el-form-item(:label="$t('addressType.displayOnCompany')" prop="isCompanyAddress")
        el-switch(v-model='temp.isCompanyAddress')
        span.switch-status {{ temp.isCompanyAddress?'Enabled':'Disabled' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createAddressType, updateAddressType, deleteAddressType } from '@/api/address-type'
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
        type: '',
        isMemberAddress: true,
        isCompanyAddress: true
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    rules() {
      return {
        type: [{ required: true, message: `${this.$t('addressType.type')} ${this.$t('validatorMessage.isRequired')}`, trigger: 'blur' }],
        isMemberAddress: [{ required: true, message: `${this.$t('addressType.displayOnMember')} ${this.$t('validatorMessage.isRequired')}`, trigger: 'blur' }],
        isCompanyAddress: [{ required: true, message: `${this.$t('addressType.displayOnCompany')} ${this.$t('validatorMessage.isRequired')}`, trigger: 'blur' }]
      }
    },
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.type.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    this.getList()
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
        type: '',
        isMemberAddress: true,
        isCompanyAddress: true
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
          createAddressType(this.temp).then((response) => {
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
      this.temp = Object.assign({}, row) // copy obj
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
          updateAddressType(tempData).then((response) => {
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
      deleteAddressType(row).then((response) => {
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

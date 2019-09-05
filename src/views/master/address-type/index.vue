<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
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
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('addressType.type')", prop='type')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.type', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='type')
        el-input(v-else v-model='temp.type', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='type' :disabled="!field.type")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.type")
      el-form-item(:label="$t('addressType.displayOnMember')" prop="isMemberAddress")
        el-switch(v-if="dialogStatus === 'create'" v-model='temp.isMemberAddress' name='isMemberAddress')
        el-switch(v-else v-model='temp.isMemberAddress' name='isMemberAddress' :disabled="!field.isMemberAddress")
        span.switch-status {{ temp.isMemberAddress?'Enabled':'Disabled' }}
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.isMemberAddress")
      el-form-item(:label="$t('addressType.displayOnCompany')" prop="isCompanyAddress")
        el-switch(v-if="dialogStatus === 'create'" v-model='temp.isCompanyAddress' name='isCompanyAddress')
        el-switch(v-else v-model='temp.isCompanyAddress' name='isCompanyAddress' :disabled="!field.isCompanyAddress")
        span.switch-status {{ temp.isCompanyAddress?'Enabled':'Disabled' }}
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.isCompanyAddress")
    .dialog-footer(slot='footer')
      el-button(@click='resetTemp')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createAddressType, updateAddressType, deleteAddressType, updateStatusAddressType } from '@/api/address-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import rules from './validation-rules'

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
      field: {
        type: false,
        isMemberAddress: false,
        isCompanyAddress: false
      },
      temp: {
        type: '',
        isMemberAddress: true,
        isCompanyAddress: true
      },
      temp2: undefined,
      tempUpdate: {
        type: 'internal',
        objectId: undefined,
        details: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules
    }
  },
  computed: {
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
    handleUpdateStatus(row) {
      const payload = {
        id: row.id,
        isActive: !row.isActive
      }
      updateStatusAddressType(payload).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.getList()
        }
        this.dialogFormVisible = false
      })
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
      fetchList().then(response => {
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.dialogFormVisible = false
      this.temp = {
        type: '',
        isMemberAddress: true,
        isCompanyAddress: true
      }
      this.temp2 = undefined
      this.field = {
        type: false,
        isMemberAddress: false,
        isCompanyAddress: false
      }
      this.tempUpdate = {
        type: 'internal',
        objectId: undefined,
        details: []
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
          createAddressType(this.temp).then((response) => {
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
      this.temp = Object.assign({}, row) // copy obj
      this.temp2 = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.tempUpdate.objectId = row.id
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.field.type) {
            this.tempUpdate.details.push({
              field: 'type', oldValue: this.temp2.type, newValue: this.temp.type
            })
          }
          if (this.field.isMemberAddress) {
            this.tempUpdate.details.push({
              field: 'isMemberAddress', oldValue: this.temp2.isMemberAddress, newValue: this.temp.isMemberAddress
            })
          }
          if (this.field.isCompanyAddress) {
            this.tempUpdate.details.push({
              field: 'isCompanyAddress', oldValue: this.temp2.isCompanyAddress, newValue: this.temp.isCompanyAddress
            })
          }
          updateAddressType(this.tempUpdate).then(response => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.resetTemp()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteAddressType(row).then(() => {
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

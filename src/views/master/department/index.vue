<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('department.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('department.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('department.description')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.description }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete')
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('department.code')", prop='code')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.code', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='code')
        el-input(v-else v-model='temp.code', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='code' :disabled="!field.code")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.code")
      el-form-item(:label="$t('department.name')", prop='name')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='name')
        el-input(v-else v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='name' :disabled="!field.name")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.name")
      el-form-item(:label="$t('department.description')", prop='description')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.description', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='description')
        el-input(v-else v-model='temp.description', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='description' :disabled="!field.description")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.description")
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createDepartment, updateDepartment, deleteDepartment } from '@/api/department'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import rules from './validation-rules'

export default {
  name: 'Department',
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
      rules,
      statusOptions: [{ value: true, label: ' enable' }, { value: false, label: ' disable' }],
      temp: {
        name: '',
        code: '',
        description: ''
      },
      temp2: undefined,
      tempUpdate: {
        name: '',
        code: '',
        description: '',
        objectId: undefined,
        details: []
      },
      field: {
        name: false,
        code: false,
        description: false
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name: '',
        code: '',
        description: ''
      }
      this.temp2 = undefined
      this.field = {
        name: false,
        code: false,
        description: false
      }
      this.tempUpdate = {
        type: '',
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
        console.log('valid', valid)
        if (valid) {
          createDepartment(this.temp).then((response) => {
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
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.tempUpdate.objectId = row.id
      this.tempUpdate.type = 'internal'
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.field.name) {
            this.tempUpdate.details.push({
              field: 'name', oldValue: this.temp2.name, newValue: this.temp.name
            })
          }
          if (this.field.code) {
            this.tempUpdate.details.push({
              field: 'code', oldValue: this.temp2.code, newValue: this.temp.code
            })
          }
          if (this.field.description) {
            this.tempUpdate.details.push({
              field: 'description', oldValue: this.temp2.description, newValue: this.temp.description
            })
          }
          updateDepartment(this.tempUpdate).then(response => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.resetTemp()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteDepartment(row).then((response) => {
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

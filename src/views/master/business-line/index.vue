
<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
    el-button.filter-item(:loading='downloadLoading', style='margin-left:10px;float:right', type='primary', @click='handleDownload' size="mini")
      | {{ $t('table.export') }} Excel

  el-table(:key='tableKey', v-loading='listLoading', :data='list.filter(data => !listQuery.q || data.name.toLowerCase().includes(listQuery.q.toLowerCase()))', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('businessLine.name')", align='left')
      template(slot-scope='scope')
        | {{ scope.row.name }}
    el-table-column(:label="$t('businessLine.code')", align='left', width='180')
      template(slot-scope='scope')
        | {{ scope.row.code }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    //- el-table-column(:label="$t('table.status')", align='left')
    //-   template(slot-scope='scope')
    //-     span(:class="scope.row.isActive ? 'label-enable' : 'label-disable'")
    //-       | {{ scope.row.isActive ? 'Active' : 'Not Active' }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
      template(slot-scope='{row}')
        Status(:data='row' :action='handleUpdateStatus' :status='row.isActive' v-crud-permission="['maker']")
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('businessLine.name')", prop='name')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='name')
        el-input(v-else v-model='temp.name', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='name' :disabled="!field.name")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.name")
      el-form-item(:label="$t('businessLine.code')", prop='code')
        el-input(v-if="dialogStatus === 'create'" v-model='temp.code', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='code')
        el-input(v-else v-model='temp.code', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='type' :disabled="!field.code")
        el-checkbox(v-if="dialogStatus === 'update'" v-model="field.code")
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createBusinessLine, updateBusinessLine, deleteBusinessLine, updateStatusBusinessLine } from '@/api/business-line'
import Pagination from '@/components/Pagination'
import rules from './validation-rules'

export default {
  name: 'BusinessLine',
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
      temp: {
        name: '',
        code: ''
      },
      temp2: undefined,
      tempUpdate: {
        name: '',
        code: '',
        objectId: undefined,
        details: []
      },
      field: {
        name: false,
        code: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules,
      downloadLoading: false
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
    handleUpdateStatus(row) {
      const payload = {
        id: row.id,
        isActive: !row.isActive
      }
      updateStatusBusinessLine(payload).then((response) => {
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
        // this.list = response TODO: Report To Backend to send pure number, current value is string
        this.list = response
        this.total = response.length

        // if (this.total) {
        //   this.list = this.list.map(i => {
        //     i.code = parseInt(i.code)
        //     return i
        //   })
        // }
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name: '',
        code: ''
      }
      this.temp2 = undefined
      this.field = {
        name: false,
        code: false
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
          createBusinessLine(this.temp).then((response) => {
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
      this.temp2 = Object.assign({}, row)
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
          updateBusinessLine(this.tempUpdate).then(response => {
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
        deleteBusinessLine(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const bankName = this.$t('bank.name')

        const tHeader = ['Business Line Name', 'Business Line Code']
        const list = this.list
        const filterVal = ['name', 'code']
        const data = this.formatJson(filterVal, list)

        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `exported-${this.$route.name}`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

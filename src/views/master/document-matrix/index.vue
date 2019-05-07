<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('documentMatrix.transactionType')", align='left' width="250")
      template(slot-scope='scope')
        span {{ scope.row.transactionType }}
    el-table-column(:label="$t('documentMatrix.type')", align='left' width="150")
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('documentMatrix.name')", align='left')
      template(slot-scope='scope')
        span {{ documentNameList[scope.row.documentId] }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='150')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='100')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('table.edit') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('documentMatrix.type')", prop='type')
       el-select(v-model='temp.type', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in typeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('documentMatrix.transactionType')", prop='transactionType')
       el-select(v-model='temp.transactionType', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in transactionTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('documentMatrix.name')", prop='documentId')
        el-select(v-model='temp.documentId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in documentOptions', :key='item.value', :label='item.label', :value='item.value')

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>
<style>
.switch-status {
  margin-left: 5px;
  font-size: 14px;
}
</style>

<script>
import { fetchList, createDocumentMatrix, updateDocumentMatrix } from '@/api/document-matrix'
import { fetchList as fetchDocument } from '@/api/document'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'

const DtransactionType = [
  'Register Company',
  'Register Group',
  'Register Member PPUKP',
  'Register Member PPIP Organisasi',
  'Register Member PPIP Individu'
]

const Dtype = [
  'Additional',
  'Mandatory'
]

export default {
  name: 'DocumentMatrix',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        q: undefined
      },
      temp: {
        id: undefined,
        type: undefined,
        transactionType: undefined,
        documentId: undefined,
        isActive: undefined,
        createdDate: undefined
      },
      documentNameList: [],
      documentOptions: [],
      transactionTypeOptions: DtransactionType.map((i) => ({ label: i, value: i })),
      typeOptions: Dtype.map((i) => ({ label: i, value: i })),
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        type: [{ required: true, message: 'This field required', trigger: 'blur' }],
        transactionType: [{ required: true, message: 'This field required', trigger: 'blur' }],
        documentId: [{ required: true, message: 'This field required', trigger: 'blur' }]
      }
    }
  },
  created() {
    fetchDocument().then(response => {
      this.documentNameList = response.data.items.map(i => i.name)
      this.documentOptions = this.documentNameList.map((i, index) => ({ label: i, value: index }))
    })
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
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
        id: undefined,
        type: undefined,
        transactionType: undefined,
        documentId: undefined,
        isActive: undefined,
        createdDate: undefined
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createDocumentMatrix(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
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
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateDocumentMatrix(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>

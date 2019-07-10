
<template lang="pug">
app-container
  .filter-container
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('benefitType.documentName')", align='left')
      template(slot-scope='scope')
        span {{ documentListName[scope.row.documentId] }}
    el-table-column(:label="$t('benefitType.documentCode')", align='left', width='180')
      template(slot-scope='scope')
        span {{ documentListCode[scope.row.documentId] }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding fixed-width', width='100')
      template(slot-scope='{row}')
        el-button(type='danger', size='mini', @click='handleDelete(row)')
          | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('benefitType.documentName')", prop='documentId')
        el-select(v-model='temp.documentId', placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in documentOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="``", prop='required')
        el-checkbox(v-model='temp.required') {{$t('benefitType.required')}}

    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchSubBenefitDocument, createBenefitType } from '@/api/benefit-type'
import { fetchList as fetchDocument } from '@/api/document'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { generateDate } from '@/utils/pensiunku'

export default {
  name: 'SubBenefitDocument',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        id: undefined,
        documentId: undefined,
        required: false,
        isActive: undefined,
        createdDate: undefined
      },
      documentList: [],
      documentListName: [],
      documentListCode: [],
      documentOptions: [],
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        documentId: [{ required: true, message: 'Document is required' }]
      }
    }
  },
  created() {
    this.getList()

    fetchDocument().then(response => {
      this.documentList = response.data.items
      this.documentListName = response.data.items.map(i => i.name)
      this.documentListCode = response.data.items.map(i => i.code)

      this.documentOptions = response.data.items.map((i, index) => ({ label: i.name, value: index }))
    })
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
      fetchSubBenefitDocument(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        documentId: undefined,
        required: false,
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
          createBenefitType(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.successNotifier()
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
    handleDelete(row) {
      this.successNotifier()
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>

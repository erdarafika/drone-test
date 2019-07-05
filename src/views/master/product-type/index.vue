<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    //- el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
    //-   | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('productType.code')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.code }}
    el-table-column(:label="$t('productType.name')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('productType.description')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.description }}
    el-table-column(:label="$t('table.createdDate')", align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    //- el-table-column(label='', align='right', class-name='small-padding fixed-width', width='150')
    //-   template(slot-scope='{row}')
    //-     el-button(type='danger', size='mini', @click='handleDelete(row)')
    //-       | {{ $t('table.delete') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit')
  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('productType.code')", prop='code')
        el-input(v-model='temp.code', name='code' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' )
      el-form-item(:label="$t('productType.name')", prop='name')
        el-input(v-model='temp.name', name='name' type='textarea', :autosize='{ minRows: 2, maxRows: 4}' )
      el-form-item(:label="$t('productType.description')", prop='description')
        el-input(v-model='temp.description', name='description' type='textarea', :autosize='{ minRows: 4, maxRows: 4}' )
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList } from '@/api/product-type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator } from '@/global-function/formValidator'

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
      statusOptions: [{ value: true, label: ' enable' }, { value: false, label: ' disable' }],
      temp: {
        code: undefined,
        name: undefined,
        description: undefined
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    rules() {
      return {
        code: [requiredValidator],
        name: [requiredValidator],
        description: []
      }
    },
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
    }
    // resetTemp() {
    //   this.temp = {
    //     code: undefined,
    //     name: undefined,
    //     description: undefined
    //   }
    // },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     console.log('valid', valid)
    //     if (valid) {
    //       createProductType(this.temp).then((response) => {
    //         if (response.status_code >= 200 && response.status_code <= 300) {
    //           this.$notify({
    //             title: this.$t('table.successTitle'),
    //             message: this.$t('table.successCaption'),
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.getList()
    //         }
    //         this.dialogFormVisible = false
    //       })
    //     }
    //   })
    // },
    // handleDelete(row) {
    //   const cancelCallback = () => this.$notify({
    //     title: this.$t('table.cancelTitle'),
    //     message: this.$t('table.cancelCaption'),
    //     type: 'warning',
    //     duration: 2000
    //   })

    //   const deleteCallback = () => {
    //     deleteProductType(row).then((response) => {
    //       this.dialogFormVisible = false
    //       this.$notify({
    //         title: this.$t('table.successTitle'),
    //         message: this.$t('table.successCaption'),
    //         type: 'success',
    //         duration: 2000
    //       })
    //       this.getList()
    //     })
    //   }

    //   this.confirmDelete(deleteCallback, cancelCallback)
    // }
  }
}
</script>

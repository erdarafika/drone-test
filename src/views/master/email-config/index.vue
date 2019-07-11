
<template lang="pug">
app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;', @keyup.native='handleFilter')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}

  el-table(:key='tableKey', v-loading='listLoading', :data='list', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('emailConfig.subject')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.subject }}
    el-table-column(:label="$t('table.createdDate')", fixed-width align='left', width='200')
      template(slot-scope='scope')
        | {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
    el-table-column(label='', align='right', class-name='small-padding', width='250')
      template(slot-scope='{row}')
        el-button(type='primary', size='mini', @click='handleUpdate(row)')
          | {{ $t('emailConfig.editTemplate') }}
        el-button(type='success', size='mini', @click='handleAttachments(row)')
          | {{ $t('emailConfig.attachments') }}
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')
  el-dialog.emailconfig-form(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible')
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='100px', style='width: 90%; margin-left:50px;')
      el-form-item(:label="$t('emailConfig.subject')", prop='subject')
        el-input(v-model='temp.subject', name='subject' type='textarea', :autosize='{ minRows: 2, maxRows: 4}')
      el-form-item(label='', prop='htmlBody')
        tinymce(v-model='temp.htmlBody', :height='300')

    .dialog-footer(slot='footer' style='width: 90%; margin-left:50px;')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

  el-dialog.emailconfig-form(:title='$t("emailConfig.attachments")', :visible.sync='attachmentsTableVisible')
    Attachments(:data="attachments")
</template>
<style lang="scss">
.emailconfig-form {
  .el-dialog{
    width: 80% !important;
    display: block !important;
  }
}
</style>

<script>
import { fetchList, createEmailConfig, updateEmailConfig, deleteEmailConfig } from '@/api/email-config'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Tinymce from '@/components/Tinymce'
import Attachments from './components/Attachments'
import { requiredValidator, alphabeticValidator } from '@/global-function/formValidator'

export default {
  name: 'EmailConfig',
  components: { Pagination, Tinymce, Attachments },
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
        subject: undefined,
        htmlBody: undefined,
        textBody: undefined,
        type: 'welcome_kit_ppukp'
      },
      attachments: undefined,
      dialogFormVisible: false,
      attachmentsTableVisible: false,
      dialogStatus: '',
      rules: {
        subject: [requiredValidator, alphabeticValidator],
        htmlBody: [requiredValidator]
      }
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
    handleAttachments(row) {
      this.attachments = row
      this.attachmentsTableVisible = true
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
        id: undefined,
        subject: undefined,
        htmlBody: undefined,
        textBody: undefined,
        type: 'welcome_kit_ppukp'
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
          createEmailConfig(this.temp).then((response) => {
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateEmailConfig(this.temp).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteEmailConfig(row).then((response) => {
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


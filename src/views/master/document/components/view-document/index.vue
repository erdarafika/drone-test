<template lang="pug">
  .document-detail
    .detail-block
      table
        tr
          th(width="200") {{ $t('document.name') }}
          td {{ data.name }}
        tr
          th {{ $t('document.code') }}
          td {{ data.code }}
        tr
          th {{ $t('table.createdDate') }}
          td {{ data.created_at | moment("Do MMMM, YYYY") }}

    el-form(:model='temp', :inline='true'  :rules='rules', ref='dataForm', label-width='150px')
      el-form-item(:label='$t("document.rejectionReason")', prop='reason')
        el-input(v-model='temp.reason', name='reason' autocomplete='off')
      el-form-item
        el-button(type='primary' @click="createData()") {{$t('table.add')}}

    el-table(:data='reasons' v-loading='listLoading')
      el-table-column(property='reason', :label='$t("document.rejectionReason")')
      el-table-column(label='Created Date', width='150')
        template(slot-scope='scope')
          span {{ scope.row.created_at | moment("Do MMMM, YYYY") }}
      el-table-column(label='', width="90")
        template(slot-scope="scope")
          el-button(type='danger', size='mini' @click="handleDelete(scope.row)")
            | {{ $t('table.delete') }}

</template>
<style lang="scss">
tr.top-bar {
  height: 50px;
}
.document-detail {
  margin-top: -24px;
  .detail-block {
    table {
      padding-bottom: 20px;
      margin-bottom: 10px;
      width: 100%;
      text-align: left;
      border-bottom: 1px solid #dfe4ed;
      th {
        padding:10px 20px 10px 0px;
      }
    }
  }
}
</style>

<script>
import { fetchReason, createReason, deleteReason } from '@/api/document'

export default {
  name: 'ViewDocument',
  props: {
    data: Object
  },
  data() {
    return {
      temp: {
        reason: undefined
      },
      reasons: null,
      total: null,
      listLoading: false,
      rules: {
        reason: [
          { required: true, message: 'Reason is required' }
        ]
      }
    }
  },
  created() {
    this.getReasons()
  },
  methods: {
    resetForm() {
      this.temp = {
        reason: undefined
      }
    },
    getReasons() {
      this.listLoading = true
      fetchReason(this.data.id).then(response => {
        this.reasons = response
        this.total = response.length
        this.listLoading = false
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = this.data.id
          createReason(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.resetForm()
              this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
              })
              this.getReasons()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleDelete(row) {
      row['documentId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteReason(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getReasons()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>

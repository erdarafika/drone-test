<template lang="pug">
  .document-detail
    .detail-block
      table
        tr.top-bar
          td(colspan="2")
            el-button.pull-right(type='danger', size='mini' @click="handleDocumentDelete(data)")
              | {{ $t('table.delete') }} {{$t('route.document')}}

        tr
          th(width="200") {{ $t('document.name') }}
          td {{ data.name }}
        tr
          th {{ $t('document.code') }}
          td {{ data.code }}
        tr
          th {{ $t('table.createdDate') }}
          td {{ data.createdDate | moment("Do MMMM, YYYY") }}

    el-form(:model='temp', :inline='true' :rules='rules', ref='dataForm', label-width='150px')
      el-form-item(:label='$t("document.rejectionReason")', prop='reason')
        el-input(v-model='temp.reason', autocomplete='off')
      el-form-item
        el-button(type='primary' @click="createData()") {{$t('table.save')}}

    el-table(:data='reasons' v-loading='listLoading')
      el-table-column(property='reason', :label='$t("document.rejectionReason")')
      el-table-column(label='Created Date', width='150')
        template(slot-scope='scope')
          span {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
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
import { fetchReason, createReason } from '@/api/document'
import { generateDate } from '@/utils/pensiunku'

export default {
  name: 'ViewDocument',
  props: {
    data: Object,
    handleDocumentDelete: Function
  },
  data() {
    return {
      temp: {
        id: null,
        createdDate: null,
        reason: undefined,
        isActive: true
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
        id: null,
        createdDate: null,
        reason: undefined,
        isActive: null
      }
    },
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.reasons.indexOf(row)
      this.reasons.splice(index, 1)
    },
    getReasons() {
      this.listLoading = true
      fetchReason().then(response => {
        this.reasons = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          this.temp.createdDate = generateDate()
          createReason(this.temp).then(() => {
            this.reasons.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })

            this.resetForm()
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          })
        }
      })
    }
  }
}
</script>

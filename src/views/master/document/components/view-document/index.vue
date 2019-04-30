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
          td {{ data.createdDate | moment("Do MMMM, YYYY") }}

    el-table(:data='reasons' v-loading='listLoading')
      el-table-column(property='reason', label='Reason')
      el-table-column(label='Created Date', width='150')
        template(slot-scope='scope')
          span {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
      el-table-column(label='', width="160")
        el-button(type='primary', size='mini')
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini')
          | {{ $t('table.delete') }}

</template>
<style lang="scss">
.document-detail {
  .detail-block {
    table {
      padding-bottom: 20px;
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
import { fetchReason } from '@/api/document'
export default {
  name: 'ViewDocument',
  props: {
    data: Object
  },
  data() {
    return {
      reasons: null,
      total: null,
      listLoading: false
    }
  },
  created() {
    this.getReasons()
  },
  methods: {
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
    }
  }
}
</script>

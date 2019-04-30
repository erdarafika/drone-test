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

    el-table(:data='dummyReason')
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
export default {
  name: 'ViewDocument',
  props: ['data'],
  data() {
    return {
      dummyReason: [{
        createdDate: '2016-05-02',
        reason: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        createdDate: '2016-05-04',
        reason: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        createdDate: '2016-05-01',
        reason: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        createdDate: '2016-05-03',
        reason: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  created() {
    console.log('data', this.data)
  }
}
</script>

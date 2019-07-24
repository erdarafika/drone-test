<template lang="pug">
  .bank-detail
    //- el-button(type='danger', size='mini' @click="documentDelete(data)" v-crud-permission="['maker']")
    //-   | {{ $t('table.delete') }} {{$t('route.bank')}}
    el-row
      el-col(:span='10')
        h3 {{$t('table.detail ')}}
        .detail-block
          table
            tr
              th(width="150") {{ $t('bank.name') }}
              td {{ data.bankName }}
            tr
              th {{ $t('bank.swiftCode') }}
              td {{ data.swiftCode }}
            tr
              th {{ $t('bank.transferCode') }}
              td {{ data.transferCode }}
      el-col(:span='10')
        h3 &nbsp;
        .detail-block
          table
            tr
              th(width="150") {{ $t('bank.code') }}
              td {{ data.code }}
            tr
              th {{ $t('table.createdDate') }}
              td {{ data.created_at | moment("Do MMMM, YYYY") }}
</template>
<style lang="scss">
tr.top-bar {
  height: 50px;
}
.bank-detail {
  margin-top: -24px;
  .detail-block {
    table {
      padding-bottom: 20px;
      margin-bottom: 10px;
      width: 100%;
      text-align: left;
      th {
        padding:10px 20px 10px 0px;
      }
    }
  }
}

.branch-block {
  h3 {
    text-align: center;
    }
}
</style>

<script>

export default {
  name: 'ViewDocument',
  props: {
    data: Object,
    handleDocumentDelete: Function
  }
}
</script>

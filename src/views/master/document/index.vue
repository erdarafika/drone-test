<template lang="pug">
app-container
  el-tabs.pensiun-tab(type='border-card')
    el-tab-pane(:label='$t("route.document")')
      Document
    el-tab-pane(:label='$t("route.documentMatrix")')
      //- Transaction
</template>

<script>
import Document from './Document'
import Transaction from './Transaction'

export default {
  name: 'Location',
  components: {
    Document,
    Transaction
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
  .pensiun-tab {
    margin-top: 0px;
  }
</style>

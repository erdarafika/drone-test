<template lang="pug">
app-container
  el-tabs.pensiun-tab(type='border-card')
    el-tab-pane(:label='$t("route.dplkInformation")')
      Information
    el-tab-pane(:label='$t("route.dplkAddress")')
      Address
    el-tab-pane(:label='$t("route.dplkBankAccount")')
      Bank
    el-tab-pane(:label='$t("route.dplkStaff")')
      Staff
</template>

<script>
import Information from './components/dplk-information'
import Staff from './components/dplk-staff'
import Address from './components/dplk-address'
import Bank from './components/dplk-bank-account'

export default {
  name: 'Location',
  components: {
    Information,
    Staff,
    Address,
    Bank
  },
  data() {
    return {
      updated: undefined
    }
  },
  methods: {

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

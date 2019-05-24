<template lang="pug">
.tab-container
  el-tabs.pensiun-tab(type='border-card')
    el-tab-pane(:label='$t("location.country")')
      Country
    el-tab-pane(:label='$t("location.province")')
      Province
    el-tab-pane(:label='$t("location.city")')
      City
</template>

<script>
import Country from './components/Country'
import Province from './components/Province'
import City from './components/City'

export default {
  name: 'Location',
  components: {
    Country,
    Province,
    City
  },
  data() {
    return {

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
    margin-top: 15px;
  }
</style>

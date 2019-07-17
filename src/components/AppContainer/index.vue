<template lang="pug">
.app-container
  .header(v-show='show')
    el-row
      el-col(:span='1')
        slot(name='header-left')
      el-col(:span='15')
        | {{title}}
      el-col(:span='8')
        slot(name='header')
  .block
    slot
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      const routeTitle = this.$route.meta.title
      const routeLangKey = `route.${routeTitle}`
      return this.$t(routeLangKey)
    }
  }
}
</script>

<style lang='scss'>
.app-container {
  margin: 20px;
  border-radius:10px;
  background: white;
  .header {
    border-radius: 10px 10px 0px 0px;
    padding: 20px;
    background: #489bff;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  .block {
    padding: 20px;
  }
}
</style>

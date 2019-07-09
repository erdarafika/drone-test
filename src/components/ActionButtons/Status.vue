<template lang="pug">

el-tooltip(:content="title" placement='top')
  svg-icon.actionButton(icon-class='disable' @click='handleAction' v-if='status')
  svg-icon.actionButton(icon-class='enable' @click='handleAction' v-if='!status')
</template>

<script>
export default {
  props: ['action', 'data', 'status'],
  computed: {
    title() {
      return this.status ? this.$t('table.disable') : this.$t('table.enable')
    }
  },
  methods: {
    handleAction() {
      this.action(this.data)
    }
  }
}
</script>

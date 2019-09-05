<template lang="pug">
  el-tooltip(:content="$t('navbar.notification')" placement='top')
    svg-icon.actionButton(icon-class='notification' @click='handleAction')
</template>

<script>
export default {
  props: ['action', 'data'],
  methods: {
    handleAction() {
      this.action(this.data)
    }
  }
}
</script>

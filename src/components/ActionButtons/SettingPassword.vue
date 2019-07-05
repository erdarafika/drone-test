<template lang="pug">
el-tooltip(:content="$t('table.delete')" placement='top')
  svg-icon.actionButton(icon-class='setting-password' @click='handleAction')
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

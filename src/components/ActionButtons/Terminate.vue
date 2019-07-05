<template lang="pug">
el-tooltip(:content="$t('table.disable')" placement='top')
  svg-icon.actionButton(icon-class='terminate' @click='handleAction')
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

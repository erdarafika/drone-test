<template lang="pug">
el-tooltip(:content="$t('table.detail')" placement='top')
  svg-icon.actionButton(icon-class='view' @click='handleAction')
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

<template lang="pug">
el-tooltip(:content="$t('table.edit')" placement='top')
  svg-icon.actionButton(icon-class='edit' @click='handleAction')
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

<template lang="pug">
el-tooltip(:content="$t('user.updateRole')" placement='top')
  svg-icon.actionButton(icon-class='authorization' @click='handleAction')
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

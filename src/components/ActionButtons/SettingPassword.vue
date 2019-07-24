<template lang="pug">
el-popover(placement='left', width='100', v-model='visible')
  p  {{ $t('message.confirm') }}
  div(style='text-align: right; margin: 0')
    el-button(size='mini', type='text', @click='visible = false') {{ $t('message.no') }}
    el-button(type='primary', size='mini', @click='handleAction') {{ $t('message.yes') }}
  el-tooltip(slot='reference' :content="$t('user.resetPassword')" placement='top')
    svg-icon.actionButton(icon-class='setting-password')
</template>

<script>
export default {
  props: ['action', 'data'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleAction() {
      this.visible = false
      this.action(this.data)
    }
  }
}
</script>

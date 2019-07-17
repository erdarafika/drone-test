<template lang="pug">
el-popover(placement='left', width='100', v-model='visible')
  p  {{ $t('message.requestApprovalConfirm') }}
  div(style='text-align: right; margin: 0')
    el-button.yesButton(size='mini', type='text', @click='visible = false') {{ $t('message.no') }}
    el-button.noButton(type='primary', size='mini', @click='handleAction') {{ $t('message.yes') }}
  el-tooltip(:content="$t('table.disable')" placement='top' slot='reference')
    svg-icon.actionButton(icon-class='terminate' )
</template>

<style lang='scss'>
.approval {
  margin-left:20px;
}
</style>

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
      this.action(this.data)
      this.visible = false
    }
  }
}
</script>

<template lang="pug">
el-popover(placement='left', width='100', v-model='visible')
  p  {{ $t('message.requestApprovalConfirm') }}
  div(style='text-align: right; margin: 0')
    el-button.yesButton(size='mini', type='text', @click='visible = false') {{ $t('message.no') }}
    el-button.noButton(type='primary', size='mini', @click='handleAction') {{ $t('message.yes') }}
  el-button(slot='reference' size='small' type='primary')
    | {{ $t('table.approve') }}
</template>

<style lang='scss'>
.approval {
  margin-left:20px;
}
</style>

<script>
export default {
  props: ['callback', 'data'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleAction() {
      this.callback(this.data)
      this.visible = false
    }
  }
}
</script>

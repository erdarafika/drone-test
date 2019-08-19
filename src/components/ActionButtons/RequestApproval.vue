<template lang="pug">
el-popover(placement='bottom', width='100', v-model='visible')
  p  {{ $t('message.requestApprovalConfirm') }}
  div(style='text-align: right; margin: 0')
    el-button(size='mini', type='text', @click='visible = false') {{ $t('message.no') }}
    el-button(type='primary', size='mini', @click='handleAction') {{ $t('message.yes') }}
  el-button.approval(slot='reference' size='small')
    | {{ $t('table.requestApproval') }}
</template>

<style lang='scss'>
.approval {
  margin-left:20px;
  color: white;
  background: #00c2c7;
  border: none;
}
.approval:hover {
  background: #009b9f;
  color: white;
}
</style>

<script>
export default {
  props: ['callback'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleAction() {
      this.callback()
      this.visible = false
    }
  }
}
</script>

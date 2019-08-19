<template lang="pug">
  el-button.confirm(size='small' @click="handleAction") {{ $t('table.confirm') }}
</template>

<style lang="scss">
  .confirm {
    color: white;
    background: #1890ff;
    border: none;
  }
  .confirm:hover {
    background: #0d73d2;
    color: white;
  }
</style>
<script>
export default {
  props: ['callback'],
  methods: {
    handleAction() {
      this.callback()
    }
  }
}
</script>

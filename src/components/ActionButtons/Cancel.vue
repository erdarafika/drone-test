<template lang="pug">
  el-button.cancel(size='small' @click="handleAction") {{ $t('table.cancel') }}
</template>

<style lang="scss">
.cancel {
  color: white;
  background: #ff3737;
  border: none;
}
.cancel:hover {
  background: #c12121;
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

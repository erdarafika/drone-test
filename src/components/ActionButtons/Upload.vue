<template lang="pug">
  el-button.upload(size='small' @click="handleAction") {{ $t('table.upload') }}
</template>

<style lang="scss">
.upload {
  color: white;
  background: #1890ff;
  border: none;
}
.upload:hover {
  background: #0d73d2;
  color: white;
}
</style>
<script>
export default {
  // eslint-disable-next-line
  props: ['callback'],
  methods: {
    handleAction() {
      this.callback()
    }
  }
}
</script>

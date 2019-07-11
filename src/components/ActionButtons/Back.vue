<template lang="pug">
svg-icon.backButton(icon-class='back' @click='handleAction')
</template>

<style>
.backButton {
  width: 1em !important;
  height: 1em !important;
  cursor: pointer;
  margin-left: 4px;
  margin-right: 4px;
}
</style>

<script>
export default {
  props: ['action'],
  methods: {
    handleAction() {
      this.action()
    }
  }
}
</script>

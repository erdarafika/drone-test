<template lang="pug">
  svg-icon.actionButton(icon-class='view' @click='handleAction')
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

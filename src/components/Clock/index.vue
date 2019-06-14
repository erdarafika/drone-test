<template lang="pug">
  div.clock
    | {{ currentTime }}
</template>

<script>

export default {
  name: 'Clock',
  data() {
    return {
      currentTime: undefined,
      format: 'Do MMMM YYYY, h:mm:ss a'
    }
  },
  created() {
    this.currentTime = this.$moment().format(this.format)
    setInterval(() => this.updateCurrentTime(), 1 * 1000)
  },
  methods: {
    async updateCurrentTime() {
      this.currentTime = await this.$moment().format(this.format)
    }

  }
}
</script>

<style>
  .clock {
    font-size: 15px !important;
    font-family: 'Roboto';
    color: #2d2d2d82 !important;
  }
</style>


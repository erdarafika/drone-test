<template lang="pug">
  div.clock
    | {{ currentTime }}
</template>

<script>

import axios from 'axios'

export default {
  name: 'Clock',
  data() {
    return {
      currentTime: undefined,
      format: 'Do MMMM YYYY, h:mm:ss a'
    }
  },
  created() {
    // this.currentTime = this.$moment(this.srvTime()).format(this.format)
    // setInterval(() => this.updateCurrentTime(), 1 * 1000)
    // this.srvTime()
    setInterval(() => this.srvTime(), 1 * 1000)
  },
  methods: {
    // async updateCurrentTime() {
    //   this.currentTime = await this.$moment(this.srvTime()).format(this.format)
    // },
    srvTime() {
      axios.get(window.location.href).then(res => {
        this.currentTime = res.headers.date
      })
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


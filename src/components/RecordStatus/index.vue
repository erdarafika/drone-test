<template lang="pug">
  span(:class="recordClass")
    | {{recordClass}}
</template>
<script>

/*
@status
  0 : pending
  1 : active
  2 : rejected
*/

export default {
  name: 'RecordStatus',
  props: ['status'],
  computed: {
    recordClass() {
      if (this.status === 0) { return 'pending' } else if (this.status === 1) { return 'active' } else { return 'rejected' }
    }
  },
  created() {
    console.log(this.status)
  }
}
</script>
<style>
    .active {
      color: white;
      background: #53b982;
      border-radius: 5px;
      padding: 5px;
    }
    .pending {
      color: white;
      background: #e6a700;
      border-radius: 5px;
      padding: 5px;
    }
    .rejected {
      color: white;
      background: #ff4949;
      border-radius: 5px;
      padding: 5px;
    }

</style>


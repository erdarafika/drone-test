<template lang="pug">
//- el-tooltip(:content="$t('table.detail')" placement='top')
el-button(type='warning', size='mini', @click='handleAction')
  | {{ $t('user.updateMenu') }}
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

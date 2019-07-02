<template lang="pug">
el-badge.item.notification-box(:value='notification.length')
  el-dropdown( trigger='click')
    el-button(type='primary')
      | {{$t('navbar.notification')}}
    el-dropdown-menu.notification-dropdown(slot='dropdown')
      el-dropdown-item.notification-item(v-for='(notif,index) in notification' :key='index' :divided='true')
        div.title {{notif.title}}
        div.created-time {{notif.created_at}}
      el-dropdown-item.notification-footer(:divided='true')
        | Lihat Semua

</template>
<style lang='scss'>

.notification-dropdown {
  padding: 0px 0 !important;
}

.notification-box {
  .el-badge__content.is-fixed {
    top: 39px !important;
    margin-right: 12px !important;
  }
}

.notification-item {
  min-width: 150px !important;
  margin-top:0px !important;
  .title {
    font-weight: bold;
  }
  .created-time {
    font-size: 12px;
    font-weight: lighter;
    color: #82848a;
  }
}

.notification-footer {
  color: #4ba2ff;
  padding-bottom: 10px !important;
}
</style>

<script>
export default {
  data() {
    return {
      notification: [
        {
          title: 'New Unit Price',
          description: 'Description 1',
          created_at: '2 minutes ago'
        },
        {
          title: 'New Company',
          description: 'Description 2',
          created_at: '10 minutes ago'
        }
      ]
    }
  }
}
</script>

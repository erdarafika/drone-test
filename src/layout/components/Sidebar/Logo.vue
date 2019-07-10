<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="getLogo(logo)" class="sidebar-logo"> -->
        <h1 class="sidebar-title">{{ collapseTitle }} </h1>
        <img v-if="profileImage" :src="getLogo(profileImage)" class="sidebar-profile-image">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="getLogo(logo)" class="sidebar-logo"> -->
        <h1 class="sidebar-title">{{ title }} </h1>
        <img v-if="profileImage" :src="getLogo(profileImage)" class="sidebar-profile-image">
        <span class="sidebar-profile-title"> {{ profileName }} </span>
        <span class="sidebar-profile-subtitle"> {{ profilePosition }} </span>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Code Cofee Creative',
      collapseTitle: 'CCC',
      logo: 'logo',
      profileImage: 'profile'
    }
  },
  computed: {
    profilePicture() {
      return this.$store.getters.avatar
    },
    profileName() {
      return this.$store.getters.name
    },
    profilePosition() {
      return this.$store.getters.position
    }
  },
  methods: {
    getLogo(img) {
      const images = require.context('@/assets/logo/', false, /\.png$/)
      return images('./' + img + '.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 170px;
  line-height: 50px;
  // background: #2b2f3a;
  // Pensiunku version
  background: white;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-profile-image {
      width: 60px;
      height: 60px;
      margin: auto;
      display: block;
    }

    & .sidebar-profile-title {

      line-height: 35px;
      display: block;
      color: #606266;
      font-weight: bold;
      font-size: 15px;
      text-align: center;
    }

    & .sidebar-profile-subtitle {

      line-height: 10px;
      display: block;
      color: #606266;
      font-weight: lighter;
      font-size: 12px;
      text-align: center;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #606266;
      font-weight: lighter;
      line-height: 50px;

      // font-size: 14px;
      // font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      // PensiunKu version
      font-family: 'Roboto', Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-size: 13px;

      vertical-align: middle;
    }
  }

  &.collapse {
    height: 100px;
    .sidebar-logo {
      margin-right: 0px;
    }
    .sidebar-profile-image {
      width: 32px;
      height: 32px;
      margin: auto;
      display: block;
    }
  }
}
</style>

<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <!-- <svg-icon class-name="international-icon" icon-class="language" /> -->
      <!-- PensiunKu version -->
      <!-- <img src="../../assets/icon/english-language.png" class="pensiunku-language-icon"> -->
      <svg-icon :icon-class="flagIcon" />

    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='id'" command="id">
        Indonesia
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    },
    flagIcon() {
      return this.$store.getters.language === 'en' ? 'united-kingdom' : 'indonesia'
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
/* .pensiunku-language-icon {
  margin-top:15px;
  width: 24px;
} */
</style>

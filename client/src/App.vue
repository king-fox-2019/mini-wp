<template>
  <div id="page">
    <Navbar :on-session="onSession"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import checkSession from '@/utils/checkSession.js'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      onSession: false
    }
  },
  created() {
    checkSession()
      .then(() => this.$store.commit('CHANGE_SESSION', true))
      .catch(() => this.$store.commit('CHANGE_SESSION', false))
  }
}
</script>

<style lang="scss">
#page {
  height: 100vh;
}
</style>

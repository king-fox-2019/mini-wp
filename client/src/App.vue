<template>
  <div id="page">
    <Navbar-Write v-if="$route.path == '/write'"></Navbar-Write>
    <Navbar v-else></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import NavbarWrite from '@/components/NavbarWrite'
import checkSession from '@/utils/checkSession.js'

export default {
  components: {
    Navbar,
    NavbarWrite
  },
  data() {
    return {}
  },
  created() {
    checkSession()
      .then(() => this.$store.commit('CHANGE_SESSION', true))
      .catch(() => this.$store.commit('CHANGE_SESSION', false))
  }
  // beforeRouteUpdate(to, from, next) {
  //   if (localStorage.getItem('access_token')) {
  //     checkSession()
  //       .then(() => {
  //         next('/explore')
  //       })
  //       .catch(() => {
  //         localStorage.clear()
  //         next()
  //       })
  //   } else next()
  // }
}
</script>

<style lang="scss">
#page {
  height: 100vh;
}
*:focus {
  outline: none;
}
</style>

<template>
  <div id="page">
    <Navbar v-if="$route.path != '/write'"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// import checkSession from '@/utils/checkSession.js'

export default {
  components: {
    Navbar
  },
  data() {
    return {}
  }
  // created() {
  //   checkSession()
  //     .then(() =>
  //     .catch(() => this.$store.commit('CHANGE_SESSION', false))
  // }
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
@font-face {
  font-family: CodeDemo;
  font-weight: bold;
  src: url('./assets/fonts/CodePro/CodeDemo-Bold.otf') format('opentype');
}
@font-face {
  font-family: CodeDemo;
  src: url('./assets/fonts/CodePro/CodeDemo-Light.otf') format('opentype');
}
@import url('https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap');

#page {
  height: 100vh;
}
*:focus {
  outline: none;
}
</style>

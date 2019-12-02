<template>
  <div id="page">
    <Navbar :on-session="onSession"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      onSession: false
    }
  }
}
</script>

<style lang="scss">
#page {
  height: 100vh;
}
</style>

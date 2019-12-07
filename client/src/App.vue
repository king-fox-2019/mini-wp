<template>
  <div>
    <LoginRegisterPage @set-login="setLogin" v-if="!isLogin"></LoginRegisterPage>
    <Homepage @set-logout="setLogout" v-if="isLogin"></Homepage>
  </div>
</template>

<script>
import LoginRegisterPage from '../src/views/LoginRegisterPage'
import Homepage from "./views/Homepage"

export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    LoginRegisterPage,
    Homepage
  },
  methods: {
    setLogin () {
      this.isLogin = true
    },
    setLogout () {
      this.isLogin = false
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style>

</style>

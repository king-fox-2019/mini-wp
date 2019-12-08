<template>
  <div>
    <LoginRegisterPage @set-login="setLogin" v-if="!isLogin"></LoginRegisterPage>
    <div :class="{'light' : (theme.isLight), 'dark' : (theme.isDark)}">
      <Homepage @set-logout="setLogout" v-if="isLogin" @change-theme="setTheme"></Homepage>
    </div>
  </div>
</template>

<script>
import LoginRegisterPage from '../src/views/LoginRegisterPage'
import Homepage from "./views/Homepage"

export default {
  data () {
    return {
      isLogin: false,
      theme: {
        isDark: false,
        isLight: true
      }
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
    },
    setTheme(dark, light) {
      this.theme.isDark = dark
      this.theme.isLight = light
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

<style scoped>
.light {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
.dark {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: scroll;
}
</style>

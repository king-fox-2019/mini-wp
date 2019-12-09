<template>
  <div>
    <HeaderMiniWP
      v-bind:isLogin="isLogin"
      v-on:logout="checkAccessToken"
      >
    </HeaderMiniWP>
    <login_register_form
      v-if="!isLogin"
      v-on:updateLoginStatus="checkAccessToken"
      v-on:passingToken="updateToken"
      >
    </login_register_form>
    <home_page v-else></home_page>

    <footer class="container-fluid mt-5">
      <div class="inner">
        <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderMiniWP from './components/HeaderMiniWP.vue'
import login_register_form from './components/login-register-form.vue'
import home_page from './components/home-page.vue'

export default {
  data: function () {
    return {
      isLogin: true,
      access_token: '',
    }
  },
  components: {
    HeaderMiniWP,
    login_register_form,
    home_page
  },
  methods: {
    checkAccessToken() {
      const access_token = localStorage.getItem('token')

      if (access_token) {
        this.access_token = access_token
        this.isLogin = true
      } else {
        this.access_token = ''
        this.isLogin = false
      }
    },
    updateToken(token) {
      localStorage.setItem('token', token)
      this.checkAccessToken()
    }
  },
  mounted: function () {
    this.checkAccessToken()
  }
}
</script>

<style scoped>
</style>

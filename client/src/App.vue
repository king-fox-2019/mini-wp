<template>
  <div>
    <HeaderMiniWP v-bind:isLogin="isLogin"></HeaderMiniWP>
    <login_register_form v-if="!isLogin"></login_register_form>
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
    }
  },
  components: {
    HeaderMiniWP,
    login_register_form,
    home_page
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <landing-page v-if="!isLogin"></landing-page>
    <home-page v-if="isLogin" @toLandingPage="landingPage"></home-page>
  </div>
</template>

<script>
import landingPage from "./pages/landingPage";
import homePage from "./pages/homePage";

export default {
  data: function() {
    return {
      cookies: document.cookie,
      isLogin: false
    };
  },
  methods: {
    landingPage() {
      this.isLogin = false;
    }
  },
  components: {
    landingPage,
    homePage
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
</style>
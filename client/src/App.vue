<template>
  <div>
    <Navbar :isLogin="isLogin" @cekLogin="cekLogin"></Navbar>
    <RegisterLogin v-if="!homepage" @cekLogin="cekLogin"></RegisterLogin>
    <router-view v-if="homepage"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import RegisterLogin from "./components/RegisterLogin.vue";
export default {
  name: "App",
  components: {
    Navbar,
    RegisterLogin
  },
  data: function() {
    return {
      articles: [],
      isLogin: false,
      homepage: true
    };
  },
  methods: {
    cekLogin() {
      if (this.isLogin) {
        this.isLogin = false;
        this.homepage = true;
      } else {
        this.isLogin = true;
        this.homepage = false;
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.homepage = true;
    }
  },
  watch: {
    $route(to, from) {
      if (from.fullPath == "/signin") {
        this.isLogin = true;
        this.homepage = true;
      }
      // console.log(to);
      // console.log(from);
    }
  }
};
</script>

<style>
html,
body {
  background-color: #f4f4f4 !important;
  font-size: 19px !important;
}
.contained {
  width: 70%;
  margin: auto;
}
.clickable {
  cursor: pointer;
}
.full-width {
  width: 100% !important;
}
.is-primary-bg {
  background: #eda28b !important;
  color: #ffffff !important;
}
.mt {
  margin-top: 20px !important;
}
</style>
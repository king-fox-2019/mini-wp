<template>
  <div>
    <LoginRegisterpage @set-login="setLogin" v-if="!isLogin"></LoginRegisterpage>
    <MainPage v-if="isLogin"></MainPage>
  </div>
</template>

<script>
import LoginRegisterpage from "./views/LoginRegisterPage";
import MainPage from "./views/MainPage";

export default {
  data() {
    return {
      isLogin: false
    };
  },
  components: {
    LoginRegisterpage,
    MainPage
  },
  methods: {
    setLogin() {
      this.isLogin = true;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style></style>
<template>
  <div>
    <app-loginRegister v-if="!isLogin || page === 'loginRegister'" @showMain="showMainView"></app-loginRegister>
    <app-main v-else-if="page === 'main'" @logout="logout"></app-main>
  </div>
</template>

<script>
import axios from "../apis/server"
import LoginRegisterPageVue from "./views/LoginRegisterPage";
import MainView from "./views/Main"
export default {
  name: "app",
  components: {
    "app-loginRegister" : LoginRegisterPageVue,
    "app-main": MainView
  },
  data() {
    return {
      isLogin: false,
      page: ""
    }
  },
  methods: {
    showLoginRegister() {
      this.page = "loginRegister"
    },
    logout() {
      this.isLogin = false
    },
    showMainView() {
      this.isLogin = true;
      this.page = "main"
    }
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      this.isLogin = false;
      this.showLoginRegister();
    } else {
      this.isLogin = true;
      this.showMainView();
    }
    // else {
    //   const headers = { access_token };
    //   console.log(headers)
    //   axios.get("/user/checkToken",{ headers })
    //     .then(() => {
    //       console.log("masukk kok")
    //       this.showMainView();
    //     })
    //     .catch(err => {
    //       console.log(err, "<<<<")
    //       localStorage.removeItem("access_token");
    //       this.showLoginRegister();
    //     })
    // }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
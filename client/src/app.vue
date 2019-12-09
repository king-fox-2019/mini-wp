<template>
  <div>
    <homePage v-if="!isLogin" @isLogin="statusLogin"></homePage>
    <dashboardUserPage v-else @isLogin="statusLogin"></dashboardUserPage>
  </div>
</template>

<script>
import dashboardUserPage from "./views/dashboardUserPage";
import homePage from "./views/homePage";

export default {
  components: {
    homePage,
    dashboardUserPage
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    statusLogin(val) {
      this.isLogin = val;
    }
  },
  created() {
    if (localStorage.getItem("token")) this.isLogin = true;
    else this.isLogin = false;
  }
};
</script>

<style></style>

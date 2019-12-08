<template>
  <div>
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: function() {
    return {
      // isLogin : false
      articles : []
    };
  },
  methods: {
   
  },
  created() {
    // if (localStorage.getItem('access_token')) {
    //   this.isLogin = true
    // }
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
</style>
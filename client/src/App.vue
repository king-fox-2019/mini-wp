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
      articles : []
    };
  },

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
  background: #EDA28B !important;
  color: #FFFFFF !important;
}
.mt {
  margin-top: 20px !important;
}
</style>
<template>
  <v-app class="grey lighten-4">
    <navbar-item></navbar-item>
    <v-content class="grey lighten-4 mx-4 my-4">
      <router-view></router-view>
    </v-content>
    <footer-item></footer-item>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "navbar-item": Navbar,
    "footer-item": Footer
  },
  data: () => ({
    //
  })
};
</script>

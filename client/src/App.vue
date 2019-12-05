<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>
    <v-content class="grey lighten-4">
      <router-view></router-view>
    </v-content>
    <Footerz></Footerz>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footerz from "./components/Footer.vue";

export default {
  name: "App",
  components: { Navbar, Footerz },
  data: () => ({
    //
  })
};
</script>

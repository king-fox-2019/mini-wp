<template>
  <nav>
    <v-snackbar
      v-model="snackbarSuccess.snackbar"
      :timeout="snackbarSuccess.timeout"
      :color="snackbarSuccess.color"
      top
    >
      {{ snackbarSuccess.text }}
      <v-btn color="black" text @click="snackbarSuccess.snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar color="grey lighten-4">
      <v-app-bar-nav-icon v-if="isLogin" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase blue-grey--text">
        <span class="font-weight-light">Article</span>
        <span>Sharing</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <formsign-item v-if="!isLogin" @snackbar-success="notify" @user-signin="infoUser"></formsign-item>

      <v-btn v-else @click="onSignOut" depressed color="grey lighten-4">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary id="drawer-menu">
      <v-layout column align-center>
        <v-flex class="mt-5" d-flex flex-column justify-center>
          <v-avatar size="100">
            <v-img :src="image"></v-img>
          </v-avatar>
          <p class="white--text subheading mt-5">{{ user }}</p>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list dense id="drawer-menu">
        <v-list-item v-for="link in links" :key="link.title" :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import FormSign from "../components/FormSign.vue";

export default {
  name: "Navbar",
  components: {
    "formsign-item": FormSign
  },
  data() {
    return {
      user: "",
      image: "",
      isLogin: false,
      drawer: false,
      links: [
        { icon: "add", text: "Add Article", route: "addarticle" },
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Articles", route: "myarticles" }
      ],
      snackbarSuccess: {
        snackbar: false,
        text: "",
        timeout: 5000,
        color: ""
      }
    };
  },
  methods: {
    notify(val) {
      this.snackbarSuccess.text = val.text;
      this.snackbarSuccess.color = val.color;
      this.snackbarSuccess.snackbar = true;
      this.isLogin = val.isLogin;
    },
    infoUser(val) {
      if (val === undefined) {
        this.user = localStorage.getItem("user");
        this.image = localStorage.getItem("image");
      } else {
        this.user = val.name;
        this.image = val.image;
      }
    },
    onSignOut() {
      localStorage.removeItem("token");
      this.snackbarSuccess.text = `Thank's For Sharing, ${localStorage.getItem(
        "user"
      )}`;
      this.snackbarSuccess.color = "primary";
      this.snackbarSuccess.snackbar = true;
      this.isLogin = false;
      this.$router.push("/");
      localStorage.removeItem("user");
      localStorage.removeItem("image");
      //notif
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.infoUser();
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
#drawer-menu {
  background: #cb2d3e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ef473a,
    #cb2d3e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ef473a,
    #cb2d3e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

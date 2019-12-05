<template>
  <nav>
    <v-app-bar color="grey lighten-4">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase blue-grey--text">
        <span class="font-weight-light">Article</span>
        <span>Sharing</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-else depressed color="grey lighten-4">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary id="drawer-menu">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Edwin Satya Yudistira</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense id="drawer-menu">
        <v-list-item v-for="link in links" :key="link.title" :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{
              link.text
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import FormLogin from "../components/FormLogin.vue";

export default {
  name: "navbar",
  components: {
    FormLogin
  },
  data() {
    return {
      isLogin: false,
      drawer: false,
      links: [
        { icon: "add", text: "Add Article", route: "/addarticle" },
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Articles", route: "/myarticles" }
      ]
    };
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

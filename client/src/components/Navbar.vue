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
    <v-app-bar
      :collapse-on-scroll="collapseOnScroll"
      :elevate-on-scroll="elevateOnScroll"
      color="grey lighten-4"
    >
      <v-app-bar-nav-icon v-if="isLogin" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase" id="logoNav" @click="goDashboard">
        <span class="font-weight-light">Article</span>
        <span color="pink lighten-1">Sharing</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <GoogleLogin
        v-if="!isLogin"
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        style="margin-right: 10px;"
      ></GoogleLogin>
      <!-- <div v-if="!isLogin" id="google-signin-button" class="g-signin2"></div> -->
      <formsign-item v-if="!isLogin" @snackbar-success="notify" @user-signin="infoUser"></formsign-item>

      <v-btn v-else @click="onSignOut" depressed color="grey lighten-4" class="ml-auto">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary id="drawer-menu">
      <v-img
        :aspect-ratio="16/9"
        src="https://i0.wp.com/wallur.com/wp-content/uploads/2016/12/yugioh-background-9.jpg?resize=1136%2C640"
      >
        <v-layout column align-center>
          <v-flex class="mt-5" d-flex flex-column justify-center>
            <v-avatar size="100">
              <v-img :src="image"></v-img>
            </v-avatar>
            <p class="white--text subheading mt-5">
              <strong class="text-uppercase font-italic font-weight-bold title">{{ user }}</strong>
            </p>
          </v-flex>
        </v-layout>
      </v-img>

      <v-divider></v-divider>

      <v-list dense id="drawer-menu">
        <addarticle-item
          @success-create="successCreate"
          @error-create="errorCreate"
          @close-create-article="drawer = false"
        ></addarticle-item>
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
import GoogleLogin from "vue-google-login";
import FormSign from "../components/FormSign.vue";
import AddArticle from "./AddArticle.vue";

export default {
  name: "Navbar",
  components: {
    "formsign-item": FormSign,
    GoogleLogin,
    "addarticle-item": AddArticle
  },
  data() {
    return {
      elevateOnScroll: true,
      collapseOnScroll: true,
      params: {
        client_id:
          "524874456233-anj0lnllh0m9dkh18nf6k36enc3qf1mt.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 115,
        height: 35,
        longtitle: false
      },
      user: "",
      image: "",
      isLogin: false,
      drawer: false,
      links: [
        // { icon: "add", text: "Add Article", route: "addarticle" },
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
    successCreate(payload) {
      this.drawer = false;
      this.$emit("success-create", payload);
    },
    errorCreate(payload) {
      this.drawer = false;
      this.$emit("error-create", payload);
    },
    notify(val) {
      // console.log("masuk notif");
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
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      this.axios({
        method: "POST",
        url: "/users/googlesignin",
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.response.name);
          localStorage.setItem("image", data.response.image);
          let notif = {
            color: "success",
            text: `Welcome to the Article Sharing, ${data.response.name}`,
            isLogin: true
          };
          let userInfo = {
            name: `${data.response.name}`,
            image: data.response.image
          };
          this.notify(notif);
          this.infoUser(userInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onFailure() {
      console.log("error");
    },
    // onSignIn(googleUser) {
    // console.log("parraaahhh");
    // const id_token = googleUser.getAuthResponse().id_token;
    // this.axios({
    //   method: "POST",
    //   url: "/users/googlesignin",
    //   data: {
    //     id_token
    //   }
    // })
    //   .then(({ data }) => {
    //     console.log("goooglleee");
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("user", data.response.name);
    //     localStorage.setItem("image", data.response.image);
    //     this.isLogin = true;
    //     let notif = {
    //       color: "success",
    //       text: `Welcome to the Article Sharing, ${data.response.name}`,
    //       isLogin: true
    //     };
    //     let userInfo = {
    //       name: `${data.response.name}`,
    //       image: data.response.image
    //     };
    //     this.notify(notif);
    //     this.infoUser(userInfo);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // },
    onSignOut() {
      if (gapi.auth2 !== undefined) {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2
          .signOut()
          .then(() => {
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
          })
          .catch(err => {
            console.log(err);
          });
      } else {
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
    goDashboard() {
      this.$router.push("/");
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.infoUser();
    } else {
      gapi.signin2.render("google-signin-button", {
        onsuccess: this.onSignIn
      });
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
#drawer-menu {
  background: #1488cc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#logoNav:hover {
  cursor: pointer;
}
</style>

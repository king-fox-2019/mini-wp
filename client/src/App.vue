<template>
  <div>
    <navbar :islogged="isLogged" @logoutapp="logoutMethod" @pagecontrol="showPage"></navbar>
    <login v-show="!isLogged" @login="loginAttempt"></login>
    <createarticleform
      class="mt-5"
      v-model="content"
      v-show="isLogged"
      @pagecontrol="showPage"
      v-if="page === 'post'"
    ></createarticleform>
    <explore v-if="page == 'explore'" :data="this.articleList"></explore>
    <myarticle v-if="page == 'myarticle'" :data="this.myArticle"></myarticle>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import login from "./components/loginComponent";
import axios from "../api/server";
import explore from "./components/articleDetail";
import createarticleform from "./components/articleComponent";
import myarticle from "./components/myArticle";

export default {
  data() {
    return {
      message: "Hello world",
      isLogged: true,
      page: "",
      articleList: [],
      myArticle: []
    };
  },
  methods: {
    authorArticle: function() {
      axios
        .get("/article/myarticle")
        .then(({ data }) => {
          this.myArticle = data;
          console.log(data);
        })
        .catch(err => {
          let fields = err.response.data.join(" | ");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: fields
          });
        });
    },
    fetchData: function() {
      axios
        .get("article")
        .then(({ data }) => {
          this.articleList = data;
        })
        .catch(err => {
          let fields = err.response.data.join(" | ");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: fields
          });
        });
    },
    showPage: function(value) {
      this.fetchData();
      if (!this.isLogged) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have to login"
        });
      } else {
        this.page = value;
      }
    },
    logoutMethod: function() {
      localStorage.removeItem("token");
      this.page = "";
      this.isLogged = false;
      Swal.fire("Logout Success!", "See you soon!", "success");
    },
    loginAttempt: function(value) {
      axios
        .post("/user/login", {
          email: value.email,
          password: value.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.isLogged = true;
          this.page = "myarticle";
        })
        .catch(err => {
          let fields = err.response.data.join(" | ");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: fields
          });
        });
    }
  },
  components: {
    navbar,
    login,
    createarticleform,
    explore,
    myarticle
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.authorArticle();
      this.fetchData();
      this.isLogged = true;
      this.page = "myarticle";
    } else {
      this.isLogged = false;
    }
  }
};
</script>

<style scoped>
</style>
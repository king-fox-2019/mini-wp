<template>
  <section id="app">
    <Navbar
      :is-logged-in="isLoggedIn"
      @check-token="checkToken"
      @log-out="logOut"
      @redirect-home="redirectHome"
      @toggle-login-form="toggleLoginForm"
      @toggle-regis-form="toggleRegisForm"
    ></Navbar>

    <LoginForm
      @check-token="checkToken"
      @toggle-login-form="toggleLoginForm"
      v-if="loginFormActive"
    ></LoginForm>

    <RegisForm
      @check-token="checkToken"
      @toggle-regis-form="toggleRegisForm"
      v-if="regisFormActive"
    ></RegisForm>

    <div id="main-content" class="mb-5" v-if="isLoggedIn">
      <div class="article-container">
        <button @click="toggleArticleAddForm">Add Article</button>
        <ArticleAddForm v-if="articleAddFormActive"></ArticleAddForm>
      </div>

      <div id="article-reader"
        v-for="article in articles" :key="article._id" 
        class="article-container my-3">
        <ArticleItem
          :title="article.title"
          :content="article.content"
          :tags="article.tags"
          :featured-image="article.featured_image"
          :author="article.author.name"
          >
        </ArticleItem>
      </div>
    </div>

    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </section>
</template>

<script>
import toastMixin from "./mixins/toastMixin";
import Navbar from "./components/Navbar";
import RegisForm from "./components/RegisForm";
import LoginForm from "./components/LoginForm";
import ArticleAddForm from "./components/ArticleAddForm.vue";
import ArticleItem from "./components/ArticleItem";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,

      regisFormActive: false,
      loginFormActive: false,

      articleAddFormActive: false,

      successMessageActive: false,
      successMessageHeader: "",

      articles: []
    };
  },
  methods: {
    checkToken: function() {
      if (localStorage.getItem("access_token")) {
        this.isLoggedIn = true;
        this.loginFormActive = false;
        this.regisFormActive = false;
      } else {
        this.isLoggedIn = false;
      }
    },
    redirectHome: function() {
      this.loginFormActive = false;
      this.regisFormActive = false;
    },
    fetchArticles: function() {
      axios({
        method: "get",
        url: process.env.HOST_SERVER + "/articles"
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch()
    },
    toggleLoginForm: function() {
      this.loginFormActive = !this.loginFormActive;
      this.regisFormActive = false;
    },
    toggleRegisForm: function() {
      this.regisFormActive = !this.regisFormActive;
      this.loginFormActive = false;
    },
    toggleArticleAddForm: function() {
      this.articleAddFormActive = !this.articleAddFormActive;
    },
    logOut: function() {
      this.toast("You are now logged out!");
      localStorage.removeItem("access_token");
      this.checkToken();
    }
  },
  created() {
    this.checkToken()
    this.fetchArticles()
  },
  components: {
    Navbar,
    RegisForm,
    LoginForm,
    ArticleItem,
    ArticleAddForm
  },
  mixins: [toastMixin]
};
</script>

<style scoped>
@import url("../css/home.css");
@import url("../css/article.css");
</style>
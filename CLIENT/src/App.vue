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

    <div id="main-content" class="mb-5">
      <div class="article-container"
        >
        <ArticleAddForm></ArticleAddForm>
      </div>

      <div id="article-reader"
        class="article-container my-3"
        >
        <ArticleItem></ArticleItem>
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

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,

      regisFormActive: false,
      loginFormActive: false,
      successMessageActive: false,

      successMessageHeader: ''
    };
  },
  methods: {
    checkToken: function() {
      if (localStorage.getItem("access_token")) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
    redirectHome: function() {
      this.loginFormActive = false;
      this.regisFormActive = false;
    },
    toggleLoginForm: function() {
      this.loginFormActive = !this.loginFormActive;
      this.regisFormActive = false;
    },
    toggleRegisForm: function() {
      this.regisFormActive = !this.regisFormActive;
      this.loginFormActive = false;
    },
    logOut: function() {
      this.toast('You are now logged out!')
      localStorage.removeItem("access_token")
      this.checkToken()
    }
  },
  created() {
    this.checkToken()
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
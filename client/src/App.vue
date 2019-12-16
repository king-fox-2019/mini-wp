<template>
  <div>
    <PageHeader
      :show-login-register="showLoginRegister"
      @data-submited-from-form="hideFormData"
      v-show="showLoginRegister"
    ></PageHeader>
    <SideBar
      v-show="showMainPage"
      @get-all-articles="showAllArticles"
      @logout-out-called="hideMainPage"
    ></SideBar>
    <LoginRegister @data-submited-from-form="hideFormData" v-show="showLoginRegister"></LoginRegister>
    <div v-show="showMainPage">
      <MainPage :articles="ArticleData"></MainPage>
    </div>
  </div>
</template>
 
<script>
import LoginRegister from "./view/LoginRegister.vue";
import MainPage from "./view/MainPage.vue";
import PageHeader from "./components/HeaderForPage.vue";
import SideBar from "./components/SideBar";

export default {
  name: "App.vue",
  components: {
    LoginRegister,
    MainPage,
    PageHeader,
    SideBar
  },
  props: ["ArticleData"],
  data() {
    return {
      showMainPage: false,
      showLoginRegister: true,
      ArticleData: []
    };
  },
  methods: {
    hideFormData() {
      console.log("tes");
      this.showMainPage = true;
      this.showLoginRegister = false;
    },
    hideMainPage() {
      console.log("masuk hide hide");
      this.showMainPage = false;
      this.showLoginRegister = true;
    },
    showAllArticles(articles) {
      console.log("ini app", articles);
      this.ArticleData = articles;
    }
  }
};
</script>

<style>
</style>
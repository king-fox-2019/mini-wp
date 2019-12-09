<template>
  <div class="bgimg">
    <sidebar
      :article="temp"
      :activePage="activePage"
      @currentPage="changePage"
      @currentUserStatus="checkUserLogin"
      @currentPaddingLeft="getCurrentPadding"
      :userLogin="userLogin"
    ></sidebar>
    <loginPage
      @currentPage="changePage"
      v-if="activePage === 'login-page'"
    ></loginPage>
    <registerPage
      @currentPage="changePage"
      v-if="activePage === 'register-page'"
    ></registerPage>
    <dashboardPage
      :leftPadding="leftPadding"
      @to-show-article-detail="changePage"
      v-if="activePage === 'dashboard-page'"
    ></dashboardPage>
    <detailPage
      @currentPage="changePage"
      :leftPadding="leftPadding"
      :article="temp"
      v-if="activePage === 'detail-page'"
    ></detailPage>
    <addArticlePage
      @currentPage="changePage"
      :leftPadding="leftPadding"
      v-if="activePage === 'add-article-page'"
    ></addArticlePage>
    <editArticlePage
      :leftPadding="leftPadding"
      @currentPage="changePage"
      :article="temp"
      v-if="activePage === 'edit-article-page'"
    ></editArticlePage>
    <!-- <landingPage></landingPage> -->
  </div>
</template>

<script>
// import landingPage from "../src/components/landingPage";
import editArticlePage from "../src/components/EditArticle";
import registerPage from "../src/components/Register";
import loginPage from "../src/components/Login";
import sidebar from "../src/components/Sidebar";
import dashboardPage from "../src/components/Dashboard";
import detailPage from "../src/components/DetailPage";
import addArticlePage from "../src/components/AddArticle";

export default {
  name: "App",
  data() {
    return {
      leftPadding: "padding-left: 0",
      activePage: "register-page",
      userLogin: false,
      temp: ""
    };
  },
  methods: {
    changePage({ page, data }) {
      this.checkUserLogin();
      this.temp = data;
      this.activePage = page;
    },
    checkUserLogin() {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) this.userLogin = true;
      else this.userLogin = false;
    },
    getCurrentPadding({ padding }) {
      this.leftPadding = padding;
    }
  },
  components: {
    dashboardPage,
    sidebar,
    detailPage,
    addArticlePage,
    loginPage,
    registerPage,
    editArticlePage
    // landingPage
  }
};
</script>

<style>
.bgimg {
  background-image: url(https://www.desktopbackground.org/download/1920x1080/2010/04/17/3405_cool-simple-white-backgrounds-picture-gallery_5120x2880_h.jpg);
  height: 100vh;
}
</style>

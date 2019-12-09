<template>
  <div>
    <PageHeader 
        :show-login-register="showLoginRegister" 
        @data-submited-from-form="hideFormData"
        v-show="showLoginRegister"
        ></PageHeader>
        <SideBar
            v-show="showMainPage"
        >
        </SideBar>
    <LoginRegister
        v-show="showLoginRegister"
    ></LoginRegister>
    <MainPage v-show="showMainPage"></MainPage>
  </div>
</template>
 
<script>
import LoginRegister from "./view/LoginRegister.vue";
import MainPage from "./view/MainPage.vue";
import PageHeader from "./components/HeaderForPage.vue";
import SideBar from './components/SideBar';

export default {
  name: "App.vue",
  components: {
    LoginRegister,
    MainPage,
    PageHeader,
    SideBar
  },
  data() {
    return {
      showMainPage: false,
      showLoginRegister: true
    };
  },
  methods: {
    hideFormData() {
      console.log("tes");
      this.showMainPage = true;
      this.showLoginRegister = false;
    },
    hideMainPage(){
      this.showMainPage = false;
      this.showLoginRegister = true;
    }
  }
};
</script>

<style>
</style>
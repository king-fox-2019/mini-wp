<template>
  <div>
    <PageHeader 
        :show-login-register="showLoginRegister" 
        @data-submited-from-form="hideFormData"></PageHeader>
    <LoginRegister></LoginRegister>
    <MainPage v-show="showMainPage"></MainPage>
  </div>
</template>
 
<script>
import LoginRegister from "./view/LoginRegister.vue";
import MainPage from "./view/MainPage.vue";
import PageHeader from "./components/HeaderForPage.vue";

export default {
  name: "App.vue",
  components: {
    LoginRegister,
    MainPage,
    PageHeader
  },
  data() {
    return {
      showMainPage: false,
      showLoginRegister: false
    };
  },
  methods: {
    hideFormData() {
      console.log("tes");
      this.showMainPage = true;
      this.showLoginRegister = false;
    }
  }
};
</script>

<style>
</style>
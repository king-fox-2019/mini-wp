<template>
  <div>
    <AuthPage v-if="page === 'auth'" @setPage="setPage"></AuthPage>
    <MainPage v-if="page === 'main'" @setPage="setPage"></MainPage>
  </div>
</template>

<script>
import AuthPage from "./views/AuthPage"
import MainPage from "./views/MainPage"
export default {
  name : 'App',
  data : function() {
    return {
      page : 'auth'
    }
  },
  methods : {
    setPage(page) {
      console.log(`masuk di method setPage app.vue`)
      this.page = page 
    }
  },
  components : {
    AuthPage,
    MainPage
  },
  created() {
    if (localStorage.getItem('token')) {
      this.page = 'main'
    }
  }
}
</script>

<style scoped>

</style>
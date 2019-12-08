<template>
  <div>
      <navbar @set-login="setLogin" :islogin="isLogin"></navbar>
      <main-page></main-page>
  </div>
</template>

<script>
import navbar from './components/navbar'
import mainPage from './views/main-page'

export default {
  components: {
      navbar,
      mainPage
  },
  data: function() {
    return {
      isLogin: false
    }
  },
  methods: {
    setLogin: function(val) {
      this.isLogin = val
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
};
</script>

<style>
</style>
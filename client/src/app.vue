<template>

  <div>
    <loginpage v-if="isLogin == false && personal === false" @loginStatus='loginStatus'></loginpage>
    <mainPage v-if="isLogin == true" @loginStatus='loginStatus'></mainPage>
    

  </div>
</template>

<script>

import mainPage from './views/mainPage'
import loginpage from './views/login'


export default {
  name: 'App',
  data() {
      return {
        isLogin : false,
        personal : false
      };
    },
    methods:{
      loginStatus(value){
        this.isLogin = value
      }
    },
    components: {

        mainPage,
        loginpage,
      
    },
      created(){
          if(localStorage.getItem('token')){
              this.isLogin = true
          }
      },

};
</script>

<style scoped>


</style>
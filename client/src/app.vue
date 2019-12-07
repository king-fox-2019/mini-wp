<template>

  <div>
    <loginpage v-if="isLogin == false" @loginStatus='loginStatus'></loginpage>
    <mainpage @loginStatus='loginStatus'></mainpage>
  </div>
</template>

<script>

import mainpage from './views/mainpage'
import loginpage from './views/login'

export default {
  name: 'App',
  data() {
      return {
        isLogin : false,
      };
    },
    methods:{
      loginStatus(value){
        this.isLogin = value
      }
    },
    components: {

        mainpage,
        loginpage
    },
      created(){
          if(localStorage.getItem('token')){
              this.isLogin = true
          }
      }

};
</script>

<style scoped>


</style>
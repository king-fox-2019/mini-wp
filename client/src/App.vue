<template>
  <div>
    <mainPage v-show="login" :loginStatus="readytofetch" @logout='cekLogin'></mainPage>
    <loginPage v-if="login == false" @loginregis="cekLogin"></loginPage>
  </div>
</template>

<script>
import mainPage from './views/main'
import loginPage from './views/login'
export default {
  data() {
    return {
      login : false,
      readytofetch : false
    };
  },
  components:{ mainPage, loginPage },
  methods:{
    cekLogin(){
      if(localStorage.access_token){
        this.login = true
        this.readytofetch = false
        setTimeout(()=>{ this.readytofetch = true }, 100);
      }else{
        this.login = false
      }
    }
  },
  created(){
    this.cekLogin()
  }
};
</script>

<style scoped>
</style>
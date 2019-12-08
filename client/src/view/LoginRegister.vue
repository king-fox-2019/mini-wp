<template>
  <div id="container">
      <!-- <Login class="login" v-show="loginForm"></Login> -->
      <Register class="register"></Register>
  </div>
</template>

<script>
// import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
    name: "LoginAndRegister",
    components:{
        Login,
        Register
    },
    data(){
        return {
            loginForm: false,
            registerForm: true
        }
    }
};
</script>

<style scoped>
#container{
    display: flex;

}

.login{
    justify-self: flex-end;
    align-self: flex-end;
}
</style>
<template>
  <div>
    <app-login
      v-if="formLogin"
      :formLogin="formLogin"
      :formRegister="formRegister"
      @checkLogin="checkLogin"
      @loginSuccess="loginSuccess"
    ></app-login>
    <app-register
      v-if="formRegister"
      :formLogin="formLogin"
      :formRegister="formRegister"
      @checkLogin="checkLogin"
    ></app-register>

  </div>
</template>


<script>
import Login from "../components/login";
import Register from "../components/register";

export default {
  data() {
    return {
      formLogin: true,
      formRegister: false,
    }
  },
  components: {
    "app-login": Login,
    "app-register": Register
  },
  methods: {
    checkLogin(login, register) {
      this.formLogin = login;
      this.formRegister = register
    },
    loginSuccess() {
      this.$emit('showMain')
    }
  }
}
</script>

<style>

</style>
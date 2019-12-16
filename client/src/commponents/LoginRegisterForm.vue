<template>
     <div class="card mx-auto border-0">
    <div class="card-header border-bottom-0 bg-transparent">
      <ul class="nav nav-tabs justify-content-center pt-4" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link text-primary"
            id="pills-login-tab"
            data-toggle="pill"
            href
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
            @click.prevent="showLogin"
          >Login</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link text-primary"
            id="pills-register-tab"
            data-toggle="pill"
            href
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
            @click.prevent="showRegister"
          >Register</a>
        </li>
      </ul>
    </div>
    <div class="card-body pb-4">
      <div class="tab-content" id="pills-tabContent">
        <LoginForm v-show="displayLogin" @set-login="setLogin"></LoginForm>
        <RegisterForm v-show="displayRegister" @set-login="setLogin"></RegisterForm>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../commponents/LoginForm";
import RegisterForm from "../commponents/RegisterForm";
export default {
  name: "LoginRegisterForm",
  components: {
    LoginForm,
    RegisterForm
  },
  data: function() {
    return {
      displayLogin: true,
      displayRegister: false
    };
  },
  methods: {
    showLogin: function() {
      this.displayLogin = true;
      this.displayRegister = false;
    },
    showRegister: function() {
      this.displayLogin = false;
      this.displayRegister = true;
    },
    setLogin: function() {
          this.$emit('set-login')
        }
  }
};
</script>

<style scoped>
</style>
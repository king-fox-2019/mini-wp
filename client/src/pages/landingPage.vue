<template>
  <div class="ui one column stackable center aligned page grid" id="my-container">
    <div class="column eight wide">
      <register-form v-if="form==='register-form'" @toLogin="changeForm"></register-form>
      <login-form v-if="form==='login-form'" @toRegister="changeForm">></login-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loginForm from "../components/loginForm";
import registerForm from "../components/registerForm";

export default {
  name: "landingPage",
  data: function() {
    return {
      form: "login-form"
    };
  },
  methods: {
    changeForm: function() {
      if (this.form === "login-form") {
        this.form = "register-form";
      } else {
        this.form = "login-form";
      }
    }
  },
  components: {
    registerForm,
    loginForm
  }
};
</script>

<style scoped>
#my-container {
  padding: 20vh;
  background: gold;
  height: 100vh;
  width: 100%;
}
</style>
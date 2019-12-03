<template>
  <div class="wrapper">
    <LoginRegisterForm @set-login="setLogin"></LoginRegisterForm>
    <div class="googleButton">
      <GoogleSignInButton @set-login="setLogin"></GoogleSignInButton>
    </div>
  </div>
</template>

<script>
import LoginRegisterForm from "../components/LoginRegisterForm"
import GoogleSignInButton from "../components/GoogleSignIn";

export default {
    name: "LoginRegisterPage",
    components: {
        LoginRegisterForm,
        GoogleSignInButton
    },
    methods: {
        setLogin() {
          this.$emit('set-login')
        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
.wrapper {
  background-image: url("https://s.w.org/style/images/about/WordPress-logotype-wmark.png");
  background-repeat: no-repeat;
  background-position-x: -150px;
  background-position-y: -130px
}
</style>
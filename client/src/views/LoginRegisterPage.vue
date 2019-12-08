<template>
  <div class="wrapper">
    <LoginRegisterForm @set-login="setLogin"></LoginRegisterForm>
  </div>
</template>

<script>
import LoginRegisterForm from "../components/LoginRegisterForm";

export default {
  name: "LoginRegisterPage",
  components: {
    LoginRegisterForm
  },
  methods: {
    setLogin() {
      this.$emit("set-login");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
.wrapper {
  background-image: url("https://s.w.org/style/images/about/WordPress-logotype-wmark.png");
  background-repeat: no-repeat;
  background-position-x: -150px;
  background-position-y: -130px;
}
</style>
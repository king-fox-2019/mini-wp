<template>
    <div id="loginPage">
        <div class="VideoBg__content d-flex justify-content-center align-items-center">
            <LoginRegisterForm class="card d-flex mx-auto border-0" @set-login="setLogin"></LoginRegisterForm>
        </div>
    </div>
</template>

<script>
import LoginRegisterForm from "../commponents/LoginRegisterForm";
  export default {
    name: "LoginRegisterpage",
  components: {
    LoginRegisterForm
  },
  methods: {
    setLogin() {
      this.$emit("set-login");
    }
  }
  }
</script>

<style scoped>
#loginPage {
  background-image: url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  width: 100vw;
  height: 100vh;
  background-size: cover;
}
.card {
  width: 300px;
  opacity: 0.9;
}
</style>
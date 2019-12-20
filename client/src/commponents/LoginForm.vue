<template>
  <div
    class="tab-pane fade show active"
    id="pills-login"
    role="tabpanel"
    aria-labelledby="pills-login-tab"
  >
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <input
          type="email"
          name="email"
          class="form-control"
          id="emailLogin"
          placeholder="Email"
          required
          autofocus
          v-model="emailLogin"
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          name="password"
          class="form-control"
          id="passwordLogin"
          placeholder="Password"
          required
          v-model="passwordLogin"
        />
      </div>

      <div class="text-center pt-4">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: "LoginForm",
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
    };
  },
  methods: {
    login() {
      axios({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$emit("set-login");
          this.emailLogin = "";
          this.passwordLogin = "";
          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Email or Password"
          });
        });
    }
  }
};
</script>

<style>
</style>
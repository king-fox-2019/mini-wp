<template>
  <div>
    <form @submit.prevent="login">
      <div class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-control rounded-0 title"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control rounded-0 title"
          placeholder="Enter Password"
        />
      </div>
      <button type="submit" class="btn btn-primary login mt-3">
        Login
      </button>
    </form>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >
      <button type="button" class="btn btn-gplus">
        <i class="fab fa-google"></i>
      </button>
    </g-signin-button>
  </div>
</template>

<script>
import axios from "../server";
import GoogleLogin from 'vue-google-login'
import Swal from "sweetalert2";

export default {
  data() {
    return {
      googleSignInParams: {client_id: "730096907393-n880p020p4bnra3a3595rvjp9k27s9gt.apps.googleusercontent.com" },
      email: "",
      password: "",
      googleSignInParams: {
        client_id:
          "730096907393-n880p020p4bnra3a3595rvjp9k27s9gt.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Success!",
            text: `Welcome to Mini Wordpress ${data.username}`,
            icon: "success",
            confirmButtonText: "Cool"
          });
          localStorage.setItem("token", data.token);
          this.$emit("isLogin", true);
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const {id_token} = googleUser.getAuthResponse(); // etc etc

      axios({
        method: "POST",
        url: "users/login/google",
        data: {
          token: id_token
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.token);
          this.$emit("isLogin", true);
        })
        .catch(err => {
          // console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.."
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.."
      });
    }
  },
  mounted(){
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  }
};
</script>

<style scoped>
.login {
  width: 100% !important;
  background-color: #00ccaa !important;
  border-color: #00ccaa !important;
  box-shadow: none !important;
  font-family: "Sulphur Point", sans-serif;
  color: #f9f9f9;
}

.login:hover {
  background-color: #00b699 !important;
  border-color: #00b699 !important;
  box-shadow: none !important;
}

.login:focus {
  background-color: #00b699 !important;
  border-color: #00b699 !important;
  box-shadow: none !important;
}

.title {
  background-color: #f9f9f9;
  border-radius: 0 !important;
  height: 35px;
  text-align: center;
  font-size: 20px;
  font-family: "Sulphur Point", sans-serif;
  border-color: #00ccaa;
  border-width: 0 0 0 4px;
}

.title:hover {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 0 0 0 4px;
}

.title:focus {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}

g-signin-button {
  margin-top: 5px
}
</style>

<template>
  <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
    <button
      type="button"
      class="btn btn-gplus"
      style="background-color: transparent; border: 0px; cursor: pointer"
    >
      <i class="fab fa-google"></i>
    </button>
  </g-signin-button>
</template>

<script>
import axios from "../../apis/axios"
import Swal from "sweetalert2";

export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "236286067260-r6fhp5u4cjekbhqtg5pnlq8e2s329lq8.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let id_token = googleUser.Zi.id_token;

      axios({
        method: "POST",
        url: "/users/googleSignIn",
        data: {
          token: id_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem("token", data.token)
          localStorage.setItem('email', data.email)
          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("set-login");
        })
        .catch(err => {
          console.log(err)
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
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  width: 40px;
  height: 33px;
  padding: 4px 8px;
  border-radius: 20px;
  background-image: linear-gradient(to bottom, #d67c7c, #7199f0, #92db9c);
  color: #fff;
  box-shadow: 0 2px 0 #86a3d6;
}
</style>
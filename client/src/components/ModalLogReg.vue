<template>
  <div class="modal-card">
    <div class="cont">
      <div class="form sign-in">
        <h2>Welcome back,</h2>
        <form @submit.prevent="login">
          <label>
            <span>Email</span>
            <input type="email" v-model="emailLogin" placeholder required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" v-model="passwordLogin" password-reveal placeholder required />
          </label>
          <b-message
            class="messages"
            type="is-danger"
            :auto-close="isActive"
            :duration="err.duration"
            :active.sync="isActive"
            has-icon
            size="is-small"
          >{{ err.message }}</b-message>

          <button type="submit" class="submit">Sign In</button>
          <button
            type="button"
            class="fb-btn"
            style
            :params="googleSignInParams"
            @click="oauthGoogle"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            <svg width="25" height="25" class="ma mb u">
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
                  fill="#4285F4"
                />
                <path
                  d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
                  fill="#34A853"
                />
                <path
                  d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
                  fill="#EA4335"
                />
              </g>
            </svg>
            Connect with
            <span>&nbsp Google</span>
          </button>
        </form>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>New here?</h2>
            <p>Create an account to receive great stories in your timeline, create your own stories and Get smarter about what matters to you.!</p>
          </div>
          <div class="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed your stories!</p>
          </div>
          <div class="img__btn" style="padding-bottom: 20px;">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up">
          <form @submit.prevent="register">
            <h2>Join Perspective.</h2>
            <label>
              <span>Name</span>
              <input v-model="nameRegister" type="text" placeholder required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" v-model="emailRegister" placeholder required />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                v-model="passwordRegister"
                password-reveal
                placeholder
                required
              />
              <p class="forgot-pass">minimum 6 length of character</p>
            </label>
            <b-message
              class="messages"
              size="is-small"
              type="is-danger"
              has-icon
              :auto-close="isActive"
              :duration="err.duration"
              :active.sync="isActive"
            >{{ err.message }}</b-message>
            <br />
            <button type="submit" class="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../config/axios";
import Swal from "sweetalert2";
export default {
  name: "ModalLoginForm",
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      emailRegister: "",
      passwordRegister: "",
      nameRegister: "",
      err: {
        message: "",
        duration: 5000
      },
      isActive: false,
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "179640782565-mdjej11jj9j61s5hrqnj1qjcsti699i7.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "/users/login",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          this.$emit("gotuser");
          this.$parent.close();
          this.$buefy.toast.open({
            message: `Welcome Back! have a nice day ${localStorage.getItem(
              "name"
            )}`,
            type: "is-success"
          });
        })
        .catch(error => {
          this.isActive = true;
          this.err.message = error.response.data.message;
        });
    },
    register() {
      axios({
        method: "post",
        url: "/users/register",
        data: {
          name: this.nameRegister,
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
        .then(({ data }) => {
          document.querySelector(".cont").classList.toggle("s--signup");
          this.$buefy.toast.open({
            message: "Your account success created, please login!",
            type: "is-success"
          });
        })
        .catch(error => {
          this.isActive = true;
          this.err.message = error.response.data.message;
        });
    },
    cahangeTab() {
      document.querySelector(".img__btn").addEventListener("click", () => {
        this.emailLogin = "";
        this.passwordLogin = "";
        this.emailRegister = "";
        this.passwordRegister = "";
        this.nameRegister = "";
        document.querySelector(".cont").classList.toggle("s--signup");
      });
    },
    oauthGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          this.isSignIn = this.$gAuth.isAuthorized;
          let id_token = GoogleUser.getAuthResponse().id_token;
          // let profile = GoogleUser.getBasicProfile()
          axios({
            url: "/users/googleLogin",
            method: "post",
            data: {
              token: id_token
            }
          })
            .then(({ data }) => {
              console.log(data);
              localStorage.setItem("token", data.token);
              localStorage.setItem("email", data.email);
              localStorage.setItem("name", data.name);
              this.$emit("gotuser");
              this.$parent.close();
              this.$buefy.toast.open({
                message: "Welcome!",
                type: "is-success"
              });
            })
            .catch(err => {
              console.log(err.response.data.message);
              this.$buefy.toast.open({
                duration: 4000,
                message: `${err.response.data.message}`,
                type: "is-danger"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      this.$gAuth
        .signOut()
        .then(() => {
          console.log("user signed out");
          // things to do when sign-out succeeds
        })
        .catch(error => {
          console.log(error);
          // things to do when sign-out fails
        });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let id_token = googleUser.Zi.id_token;

      axios({
        method: "POST",
        url: "/googleLogin",
        data: {
          token: id_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);

          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("set-login");
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
      //   console.log('OH NOES', error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.."
      });
    }
  },
  created() {},
  mounted() {
    document.querySelector(".img__btn").addEventListener("click", () => {
      this.emailLogin = "";
      this.passwordLogin = "";
      this.emailRegister = "";
      this.passwordRegister = "";
      this.nameRegister = "";
      document.querySelector(".cont").classList.toggle("s--signup");
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Abril+Fatface|DM+Serif+Text|Playfair+Display|Poppins|Prata|Raleway|Vidaloka&display=swap");
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.messages {
  width: 200px !important;
  margin: 5px auto !important;
  width: auto;
  padding: 0 !important;
  font-size: 9px !important;
}
body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: #ededed;
}
input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
.tip {
  font-size: 10px;
  margin: 40px auto;
  text-align: center;
}
.cont {
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 550px;
  height: 400px;
  background: #fff;
}
.form {
  position: relative;
  width: 340px;
  transition: transform 1.2s ease-in-out;
  padding: 60px 30px 0;
}
.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 340px;
  top: 0;
  width: 550px;
  height: 100%;
  padding-left: 210px;
  background: #fff;
  transition: transform 1.2s ease-in-out;
}
.cont.s--signup .sub-cont {
  transform: translate3d(-340px, 0, 0);
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 210px;
  height: 100%;
  padding-top: 340px;
}
.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 550px;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1517449905587-f80695d63356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
  background-image: url("https://images.unsplash.com/photo-1572705824045-3dd0c9a47945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80");
  background-size: cover;
  transition: transform 1.2s ease-in-out;
}
.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.cont.s--signup .img:before {
  transform: translate3d(240px, 0, 0);
}
.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;
}
.img__text h2 {
  margin-bottom: 10px;
  margin-top: 0;
  font-weight: normal;
}
.img__text p {
  font-size: 11px;
  line-height: 1.5;
}
.cont.s--signup .img__text.m--up {
  transform: translateX(420px);
}
.img__text.m--in {
  transform: translateX(-420px);
}
.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}
.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 80px;
  height: 30px;
  margin: 0 auto 100px auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  bottom: 30px;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}
.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}
.img__btn span.m--in {
  transform: translateY(-72px);
}
.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}
.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}
h2 {
  font-family: "Abril Fatface", cursive;
  font-family: "DM Serif Text", serif;
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 35px;
  /* font-weight: bold; */
}
label {
  display: block;
  width: 210px;
  margin: 10px auto 0;
  text-align: center;
}
label span {
  font-size: 11px;
  color: #636363;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: bold;
}
input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 11px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}
button {
  display: block;
  margin: 0 auto;
  width: 150px;
  height: 26px;
  border-radius: 30px;
  color: rgb(63, 60, 60);
  font-size: 11px;
  cursor: pointer;
}
.forgot-pass {
  /* margin-top: 15px; */
  text-align: center;
  font-size: 10px;
  color: #919191;
  font-family: "Raleway", sans-serif;
}
.submit {
  /* position: fixed; */
  border-radius: 2px;
  height: 30px;
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  background: #eacda4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bolder;
  /* border: 1px solid #575656; */
}
.fb-btn {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cdc6c6;
  border-radius: 2px;
  color: #494949;
}
.fb-btn span {
  font-weight: bold;
  color: #464646;
}
.sign-in {
  transition-timing-function: ease-out;
}
.cont.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 1.2s;
  transform: translate3d(340px, 0, 0);
}
.sign-up {
  transform: translate3d(-550px, 0, 0);
}
.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}
.sign-up button.submit {
  margin-top: -5px;
}
.sign-up label {
  margin-top: 5px;
}
</style>
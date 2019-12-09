<template>
  <div class="modal-card" style="width: auto; height: auto;">
    <div class="cont">
      <div class="form sign-in">
        <h2>Welcome back,</h2>
        <form @submit.prevent="loginUser">
          <label>
            <span>Email</span>
            <input type="email" v-model="emailLogin" placeholder required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" v-model="passwordLogin" password-reveal placeholder required />
          </label>
          <b-message
            type="is-danger"
            size="is-small"
            has-icon
            :auto-close="isActive"
            :duration="err.duration"
            :active.sync="isActive"
          >{{ err.message }}</b-message>
          <p class="forgot-pass">minimum 6 length of character</p>
          <button type="submit" class="submit">Sign In</button>
          <button type="button" class="fb-btn">
            Connect with
            <span>facebook</span>
          </button>
        </form>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div class="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div class="img__btn">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up">
          <form @submit.prevent="registerUser">
            <h2>Time to feel like home,</h2>
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
            </label>
            <button type="submit" class="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../config/axios";
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
      isActive: false
    };
  },
  methods: {
    loginUser() {
      axios({
        method: "post",
        url: "/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$emit("gotuser");
          this.$parent.close();
          this.$buefy.toast.open({
            message: "Welcome Back!",
            type: "is-success"
          });
        })
        .catch(error => {
          this.isActive = true;
          this.err.message = error.response.data.message;
        });
    },
    registerUser() {
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
          localStorage.setItem("token", data.token);
          this.$emit("gotuser");
          this.$parent.close();
          this.$buefy.toast.open({
            message: "Welcome!",
            type: "is-success"
          });
        })
        .catch(error => {
          this.isActive = true;
          this.err.message = error.response.data.message;
        });
    },
    loginTab() {
      this.loginForm = true;
      this.type = "Sign In";
    },
    registerTab() {
      this.loginForm = false;
      this.type = "Sign Up";
    },
    switch() {
      $(".img__btn").on("click", function() {
        document.querySelector(".cont").classList.toggle("s--signup");
      });
    }
  },
  created() {},
  mounted() {
    document.querySelector(".img__btn").addEventListener("click", function() {
      document.querySelector(".cont").classList.toggle("s--signup");
    });
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
  overflow: hidden;
  position: relative;
  width: 600px;
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
  left: 390px;
  top: 0;
  width: 600px;
  height: 100%;
  padding-left: 210px;
  background: #fff;
  transition: transform 1.2s ease-in-out;
}
.cont.s--signup .sub-cont {
  transform: translate3d(-340px, 0, 0);
}
button {
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 26px;
  border-radius: 30px;
  color: #fff;
  font-size: 11px;
  cursor: pointer;
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
  width: 600px;
  height: 100%;
  /* background-image: url("https://i.pinimg.com/564x/40/cb/5d/40cb5d5977da8fb9ac3a08b3788da0e6.jpg"); */
  background-image: url("https://i.pinimg.com/564x/7e/4d/f8/7e4df87bdffeec4ada7b4d3676515ccc.jpg");
  /* background-image: url("https://images.unsplash.com/photo-1517449905587-f80695d63356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80"); */
  /* background-image: url("https://images.unsplash.com/photo-1487073240288-854ac7f1bb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"); */
  background-image: url("https://images.unsplash.com/photo-1572705824045-3dd0c9a47945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80");
  background-size: cover;
  transition: transform 1.2s ease-in-out;
}
.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 640;
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
  width: 100%;
  font-size: 20px;
  text-align: center;
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
.forgot-pass {
  /* margin-top: 15px; */
  text-align: center;
  font-size: 11px;
  color: #cfcfcf;
}
.submit {
  margin-top: 40px;
  margin-bottom: 10px;
  background: #d4af7a;
  text-transform: uppercase;
}
.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
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
  transform: translate3d(-600px, 0, 0);
}
.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}
</style>
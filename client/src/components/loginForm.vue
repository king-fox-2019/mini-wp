<template>
  <div>
    <message-box v-if="isMessage" :message="message"></message-box>
    <form class="ui form" @submit.prevent="logIn">
      <div class="field">
        <label>Email</label>
        <input type="email" name="email" placeholder="dummy@mail.com" v-model="email" id="email" />
      </div>
      <div class="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="12345678"
          v-model="password"
          id="password"
        />
      </div>
      <div class="fluid ui buttons">
        <button class="ui red labeled icon button" type="submit">
          <i class="user alternate icon"></i>
          Log In
        </button>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </form>
    <br />
    <div class="fluid ui button" @click.prevent="toRegister">
      <div class="content">Doesn't have account yet? Register here!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import messageBox from "./messageBox";

export default {
  name: "landingPage",
  data: function() {
    return {
      email: null,
      password: null,
      isMessage: false,
      message: ""
    };
  },
  methods: {
    logIn: function() {
      // console.log(this.password);
      // console.log(this.email);
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.isMessage = true;
          this.message = "User successfully log in";
          localStorage.setItem("access_token", response.data);
          location.reload();
        })
        .catch(err => {
          this.isMessage = true;
          this.message = err;
        });
    },
    toRegister: function() {
      this.reset();
      this.$emit("toRegister");
    },
    reset() {
      this.email = "";
      this.password = "";
      this.isMessage = false;
      this.message = "";
    },
    onSignIn(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: `http://localhost:3000/users/googleLogin`,
        data: {
          id_token: id_token
        }
      })
        .then(response => {
          localStorage.setItem("access_token", response.data);
          this.isMessage = true;
          this.message = "User successfully log in";
        })
        .catch(err => {
          this.isMessage = true;
          this.message = err;
        });
    }
  },
  components: {
    messageBox
  }
};
</script>

<style scoped></style>

<template>
  <div>
    <message-box v-if="isMessage" :message="message"></message-box>
    <form class="ui form" @submit.prevent="register">
      <div class="field">
        <label>Username</label>
        <input type="text" name="username" placeholder="dummy" v-model="username" />
      </div>
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
      <button class="ui red labeled icon button" type="submit">
        <i class="user alternate icon"></i>
        Register
      </button>
    </form>
    <br />
    <div class="fluid ui button" @click.prevent="toLogin">
      <div class="content">Already have an account? Log in here!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import messageBox from "./messageBox";

export default {
  name: "registerForm",
  data: function() {
    return {
      username: null,
      password: null,
      email: null,
      isMessage: false,
      message: ""
    };
  },
  methods: {
    register: function() {
      console.log(this.username);
      console.log(this.password);
      console.log(this.email);
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: {
          username: this.username,
          password: this.password,
          email: this.email
        }
      })
        .then(response => {
          console.log("bisa register", response);
          this.isMessage = true;
          this.message =
            "User successfully created. Please log in to access our homepage";
          location.reload();
        })
        .catch(err => {
          console.log(err);
          this.isMessage = true;
          this.message = err;
        });
    },
    toLogin: function() {
      this.reset();
      this.$emit("toLogin");
    },
    reset() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.isMessage = false;
      this.message = "";
    }
  },
  components: {
    messageBox
  }
};
</script>

<style scoped>
</style>
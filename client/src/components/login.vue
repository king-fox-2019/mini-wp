<template>
  <div class="d-flex justify-content-center vertical-center">
    <div class="col-sm-3">
      <form action="/action_page.php" @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            id="email"
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter password"
            id="pwd"
          />
        </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-primary">Submit</button>
          <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">Sign in with Google         </g-signin-button>
        </div>
      </form>
      <a href id="register-btn" @click.prevent="show('register')">Register</a>
    </div>
  </div>
</template>

<script>
import axios from "../../helpers/axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      googleSignInParams: {
        client_id: '766396306385-t7lci7ah0ejn599mns2avhvqhtpovva6.apps.googleusercontent.com'
      }
    };
  },
  methods: {
    show: function(param) {
      this.$parent.toShow(param);
    },
    login: function() {
      axios
        .post("/user/login", {
          email: this.email,
          password: this.password
        })
        .then(access_token => {
          localStorage.setItem("access_token", access_token.data);
          this.$parent.login();
        })
        .catch(err => console.log(err));
    },
    onSignInSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: "/user/googleSignIn",
        data: { token: id_token }
      })
        .then(access_token => {
          console.log(access_token.data)
          localStorage.setItem("access_token", access_token.data);
          this.$parent.login()
        })
        .catch(err => console.log(err));
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>
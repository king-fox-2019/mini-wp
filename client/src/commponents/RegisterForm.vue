<template>
  <div
    class="tab-pane fade show active"
    id="pills-register"
    role="tabpanel"
    aria-labelledby="pills-register-tab"
  >
    <form v-on:submit.prevent="register">
      <div class="form-group">
        <label for="email">Your name :</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          placeholder="your name"
          v-model="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Your email :</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="email@mail.com"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Your phone number:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          class="form-control"
          v-model="phone"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="Set a password"
          v-model="password"
          required
        />
      </div>

      <div class="text-center pt-2 pb-1">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
    <googleLogin :params="params" :onSuccess="onSuccess" >Login</googleLogin>
  </div>
</template>

<script>
import googleLogin from 'vue-google-login'
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "RegisterForm",
  components:  {
googleLogin
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      username: "",
      phone: "+62",
      params: {
                    client_id: "406800739449-f4dl15t3333dka2qf917rk90vcicatsj.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
      renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
    };
  },
  methods: {
    register() {
      axios({
        url: "http://localhost:3000/users/register",
        method: "POST",
        data: {
          name: this.name,  
          email: this.email,
          password: this.password,
          username: this.username,
          phoneNumber: this.phone
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem("token", data.token);
          this.$emit("set-login");
          console.log(data);
          this.email = "";
          this.password = "";
          this.phone = "";
          this.username = "";
          Swal.fire({
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              "The email that you use is already registered in our database, please use other email.",
            footer: "<a href>Why do I have this issue?</a>"
          });
        });
    },
    onSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    axios({
        url : `http://localhost:3000/users/loginGoogle`,
        method : "POST",
        data : {
            google_token : id_token
        }
    })
    .then( data => {
        this.$emit("set-login")
        localStorage.setItem("token", data.data.token)
    })
    .catch(err=> {
        console.log(err)
    })
  }
}
}
</script>

<style>
</style>
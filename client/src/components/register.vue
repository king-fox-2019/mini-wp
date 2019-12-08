<template>
  <div
      id="register"
      class="mt-5 container justify-content-center border rounded-sm bg-light p-0"
      style="width:30%; "
    >
      <b-form id="register-form" class="p-3" v-on:submit.prevent="onSubmit">
        
        <h1 class="h3 my-3 font-weight-normal text-center">Register</h1>

        <b-form-group
          label="Username:"
          label-for="reg-username"
        >
          <b-form-input
            id="reg-username"
            type="text"
            v-model="username"
            required
            placeholder="Enter your username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Email address:"
          label-for="reg-email"
        >
          <b-form-input
            id="reg-email"
            type="email"
            v-model="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password:"
          label-for="reg-password"
        >
          <b-form-input
            id="reg-password"
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
          ></b-form-input>
        </b-form-group>


        
          <b-button block variant="primary" type="submit">Register</b-button>
          <p class="mt-2 text-center text-secondary">Already have an account?<a href="#" @click.prevent="checkLogin" > Sign in</a></p>
        </b-form>
        <div class="mx-0 copyright">
          <p class=" text-muted">&copy; 2019</p>
        </div>
    </div>
</template>

<script>
import axios from "../../apis/server"
import Swal from 'sweetalert2'

export default {
  props: ["formLogin", "formRegister"],
  name: "register",
  data () {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "/user/signup",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: "Successfully registered!"
          })
          this.$emit("checkLogin", true, false)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    checkLogin() {
      if (this.formLogin) {
        this.$emit("checkLogin", false, true);
      } else {
        this.$emit("checkLogin", true, false);
      }
    }
  }
}
</script>

<style scoped>
  
  h1 {
   font-family: 'Solway', serif;
 }

  #register {
    position: relative;
  }

 .copyright {
   font-size: 0.8em;
   text-align: center;
   width: 100%;
   display: inline-block;
   position: absolute;
   bottom: 0
 }
</style>
<template>
  <section id="regis-form">
    <div class="wrapper">
      <div class="form-container">
        <h2 class="text-white">Create an account</h2>

        <form class="form">
          <input
            v-model="email" 
            type="email" 
            placeholder="Email" 
            />
          <input
            v-model="name" 
            type="text" 
            placeholder="Username" 
            />
          <input 
            v-model="password"
            type="password" 
            placeholder="Password" 
            />
          <button @click.prevent="register" type="submit" id="login-button">Register</button>
          <div class="ui horizontal divider text-white my-4 px-6">Or</div>
          
          <GoogleSignIn
            @check-token="emitCheckToken"/>
        </form>
      </div>

    </div>
  </section>
</template>

<script>
import GoogleSignIn from "./GoogleSignInButton"
import axios from "axios"
import toastMixin from "../mixins/toastMixin"

export default {
  name: "regis-form",
  data () {
    return {
      email: '',
      name: '',
      password: ''
    }
  },
  methods: {
    register: function () {
       axios({
        method: 'post',
        url: process.env.HOST_SERVER + '/users/register',
        data: {
          email: this.email,
          name: this.name,
          password: this.password
        }
      })
      .then(({ data }) => {
        // console.log('berhasil register', data)
        localStorage.setItem('access_token', data.access_token)
        this.toast(data.message)
        this.$emit('toggle-regis-form')
        this.$emit('check-token')
      })
      .catch(({ response }) => {
        response.data.messages.forEach(message => {
          this.danger(message)
        })
        // console.log(response.data.messages)
      })
    },
    emitCheckToken: function () {
      this.$emit('check-token')
    }
  },
  components: {
    GoogleSignIn
  },
  mixins: [toastMixin]
}
</script>

<style scoped>
  @import url("../../css/regis-form.css");
</style>
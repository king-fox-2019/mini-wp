<template>
  <section id="login-form">
    <div class="wrapper">
      <div class="form-container">
        <h2 class="text-white">Welcome back :)</h2>

        <form class="form">
          <input
            v-model="email"
            type="email" 
            placeholder="Email" 
            />
          <input
            v-model="password" 
            type="password" 
            placeholder="Password" 
            />
          <button 
            @click.prevent="logIn" 
            type="submit" 
            id="login-button"
            >Log in</button>
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
import toastMixin from "../mixins/toastMixin"
import axios from "axios"

export default {
  name: "login-form",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logIn: function () {
       axios({
        method: 'post',
        url: process.env.HOST_SERVER + '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({ data }) => {
        // console.log('berhasil login', data)
        this.toast(data.message)
        localStorage.setItem('access_token', data.access_token)
        this.$emit('toggle-login-form')
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
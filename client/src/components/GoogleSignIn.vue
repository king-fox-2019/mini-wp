<template>
  <div class="g-signin2" v-on:data-onsuccess="onSignIn"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleSignIn',
  methods: {
    onSignIn(user) {
      console.log('masuk pak eko')
      console.log(user.getBasicProfile())

      axios({
        url: 'http://localhost:3000/users/google-signin',
        data: {
          google_token: user.getAuthResponse().id_token
        }
      })
        .then(function (result) {
          console.log(result)
        })
        .catch(console.log)
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <form
      class="form-signin"
      v-on:submit.prevent="loginUser"
      >
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
          >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
          >
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <small class="form-text text-muted"><a href="#"><a href="#" v-on:click.prevent="changeDisplay"><span class="fas fa-angle-double-left"></span> Register</a></small>
    </form>
  </div>
</template>

<script>
import axios from '../utils/axios-instance.js'

export default {
  name: 'LoginForm',
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    changeDisplay() {
      this.$emit('change-display', 'register')
    },
    loginUser() {
      axios.post('users/login', {
        email: this.email,
        password: this.password,
      })
        .then(({ data }) => {
          this.$emit('passingToken', data.access_token)
        })
        .catch(console.log)
        .finally(() => {
          this.password = ''
        })
    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 50%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  min-height: 83vh;
}

a:hover {
  text-decoration: none;
}
</style>

<template>
  <div>
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <div class="form-group">
        <label for="exampleUsernameInput">Username</label>
        <input type="text" class="form-control" id="exampleUsernameInput" aria-describedby="usernameHelp">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary mr-2">Register</button>
      </div>
      <small class="form-text text-muted">Already registered? <a href="#" v-on:click.prevent="changeDisplay">Login <span class="fas fa-angle-double-right"></span></a></small>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      google_token: '',
    }
  },
  name: 'RegisterForm',
  methods: {
    changeDisplay() {
      this.$emit('change-display', 'login')
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

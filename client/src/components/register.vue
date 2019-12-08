<template>
  <div class="d-flex justify-content-center vertical-center">
    <div class="col-sm-3">
      <form action="/action_page.php" @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            v-model="username"
            type="username"
            class="form-control"
            placeholder="Enter username"
            id="username"
          />
        </div>
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <a href id="backtologin-btn" @click.prevent="show('login')">Back to login</a>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    show: function(param) {
      this.$parent.toShow(param);
    },
    register:function(){
      axios.post('/user/register',{
        username:this.username,
        email:this.email,
        password:this.password
      })
      .then(access_token=>{
        localStorage.setItem('access_token',access_token.data)
        this.$parent.login()
      })
      .catch(err=>console.log(err))
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <navbar :islogged="isLogged" @pagecontrol="showPage"></navbar>
    <login v-show="!isLogged" @login="loginAttempt"></login>
    <!-- <createarticleForm v-show=""></createarticleform> -->
  </div>
</template>

<script>
  import navbar from './components/navbar';
  import login from './components/loginComponent';

  import axios from '../api/server';

  export default {
    data() {
      return {
        message: 'Hello world',
        isLogged: true,
        page: ''
      };
    },
    methods: {
      showPage: function(value) {
        alert(value)
      },
      loginAttempt: function(value) {
        axios 
          .post('/user/login', {
            email: value.email,
            password: value.password
          })
          .then(({data})=> {
            localStorage.setItem('token', data)
            Swal.fire(
              'Login Success!',
              'Welcome!',
              'success'
            )
            this.isLogged = true
          })
          .catch(err=> {
            let fields = err.response.data.join(' | ')
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: fields
            })
          })
      }
    },
    components: {
      navbar,
      login
    },
    created() {
      if(localStorage.getItem('token')) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    }
  }
</script>

<style scoped>
</style>
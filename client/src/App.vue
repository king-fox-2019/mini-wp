<template>
  <div>
    <navbar :islogged="isLogged" @logoutapp="logoutMethod" @pagecontrol="showPage"></navbar>
    <login v-if="!isLogged" @login="loginAttempt"></login>
    <createarticleform class="mt-5" v-model="content" v-show="isLogged" @pagecontrol="showPage" v-if="page === 'post'"></createarticleform>
    <explore v-if="page === 'explore'" :data="this.articleList"></explore>
    <myarticle v-if="page === 'myarticle'" :data="this.articleList"></myarticle>
  </div>
</template>

<script>
  import navbar from './components/navbar';
  import login from './components/loginComponent';
  import axios from '../api/server';
  import explore from './components/articleDetail';
  import createarticleform from './components/articleComponent';
  import myarticle from './components/myArticle';

  export default {
    data() {
      return {
        message: 'Hello world',
        isLogged: true,
        page: '',
        articleList: []
      };
    },
    methods: {
      fetchData: function() {
        axios
          .get('article')
          .then(({data})=> {
            console.log(data)
            this.articleList = data
          })
          .catch(err=>{
            let fields = err.response.data.join(' | ')
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: fields
              })
        })
      },
      showPage: function(value) {
        this.fetchData()
        if(!this.isLogged) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You have to login'
            })
        } else {
          this.page = value
        }
      },
      logoutMethod: function() {
        localStorage.removeItem('token')
        this.page = ''
        this.isLogged = false
        Swal.fire(
          'Logout Success!',
          'See you soon!',
          'success'
        )

      },
      loginAttempt: function(value) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        axios 
          .post('/user/login', {
            email: value.email,
            password: value.password
          })
          .then(({data})=> {
            localStorage.setItem('token', data)
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            this.fetchData()
            this.isLogged = true
            this.page = 'explore'
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
      login,
      createarticleform,
      explore,
      myarticle
      
    },
    created() {
      if(localStorage.getItem('token')) {
        this.fetchData()
        this.isLogged = true
        this.page = 'article'
      } else {
        this.isLogged = false
      }
    }
  }
</script>

<style scoped>
</style>
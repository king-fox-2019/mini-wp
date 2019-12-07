<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item>
        <i class="fab fa-wordpress-simple"></i>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item @click="setPage('private')">
        <h1>
          Hello, {{ this.email }}
        </h1>
      </b-navbar-item>
      <b-navbar-item @click="setPage('public')">
        <h1>
          Public
        </h1>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light" @click="setPage('writeArticle')">
            <i class="far fa-edit"></i>Write
          </a>
          <a class="button is-primary" @click="logout()">
            <strong>Logout</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
	position: 'is-top',
	showConfirmButton: false,
	timer: 1500
})

export default {
  nama: 'Navbar',
  data(){
    return {
      email: ''
    }
  },
  methods: {
    logout(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut()
        .then(() => {
          localStorage.clear()
          this.$emit('set-logout')
          Toast.fire({
            icon: 'success',
            title: 'Logged out, see ya!'
          })
        })
        .catch(() => {
					Swal.fire({
            icon: 'error',
            title: 'Sorry,',
            text: 'Logout failed'
          })
        })
    },
    setPage(page){
      this.$emit('switch-page', page)
    }
  },
  created(){
    if(localStorage.getItem('email')){
      this.email = localStorage.getItem('email')
    }
  }
}
</script>

<style scoped>

</style>
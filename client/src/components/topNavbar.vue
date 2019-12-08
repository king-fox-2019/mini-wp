<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" >
      <b-navbar-brand>MiniWP</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if='isLogin' class='ml-auto'>
          <b-nav-item @click='newPost'>New Post</b-nav-item>
          <b-nav-item @click='myposts'>My Posts</b-nav-item>
          <b-nav-item @click.prevent='logout'>Logout</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Email" v-model='email' type='email'></b-form-input>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Password" v-model='password' type='password'></b-form-input>
            <b-button size="sm" class="my-2 mx-1 my-sm-0" type="submit" @click.prevent='login'>Login</b-button>
            <b-button size="sm" class="my-2 mx-1 my-sm-0" type="submit" @click.prevent='register'>Register</b-button>
<!--             <b-button size="sm" class="my-2 mx-1 my-sm-0" type="submit">Login with Github</b-button>
 -->          </b-nav-form>


<!--             <b-nav-item-dropdown right>
            Using 'button-content' slot
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
-->            
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
export default {

  name: 'topNavbar',

  data () {
    return {
      isLogin: false,
      email: '',
      password: '',
    }
  },
  methods: {
    register(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          Swal.fire('Success', 'Register success', 'success')
          this.login(false)
        })
        .catch((err) => {
          Swal.fire('Error', 'Please use another email', 'error')
        })
    },
    login(isRegistered){
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          localStorage.setItem('access_token', data)
          if (isRegistered){
            Swal.fire('Success', 'Login success', 'success')
          }
          this.$emit('show', 'list')
          this.isLogin = true
        })
        .catch((err) => {
          Swal.fire('Error', 'Wrong username or password', 'error')
        })
    },
    githubLogin(){
      
    },
    logout(){
      localStorage.removeItem('access_token')
      this.email = ''
      this.password = ''
      this.isLogin = false
      this.$emit('show', '')
    },
    newPost(){
      this.$emit('show', 'form')
    },
    myposts(){
      this.$emit('show', 'list')
    }
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.$emit('show', 'list')
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
</style>  
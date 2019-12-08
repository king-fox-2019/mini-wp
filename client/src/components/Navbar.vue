<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" id="brand-title" href="" @click.prevent="backHome">Tech Press</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown" v-if="isLogin">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Articles
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Published</a>
                <a class="dropdown-item" href="#">Draft</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click.prevent="showCreateArticle">Create Article</a>
              </div>
            </li>
          </ul>
          <div class="mx-2">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown" v-if="isLogin">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{user.username}}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" @click.prevent="showDetailUser(user.id)">Profile</a>
                </div>
              </li>
            </ul>
          </div>
          <button class="btn btn-primary my-2 my-sm-0 mr-2" type="submit" @click.prevent="showLogin" v-if="!isLogin">Signin</button>
          <button class="btn btn-success my-2 my-sm-0 mr-2" type="submit" @click.prevent="showRegister" v-if="!isLogin">Signup</button>
          <button class="btn btn-dark my-2 my-sm-0" type="submit" v-if="isLogin" @click.prevent="userLogout">Signout</button>
        </div>
      </nav>
</div>
</template>

<script>
export default {
    data(){
      return {
      }
    },
    props: ['user','isLogin'],
    methods:{
      showRegister(){
        this.$emit('show-register')
      },
      showLogin(){
        this.$emit('show-login')
      },
      backHome(){
        this.$emit('back-home')
      },
      userLogout(){
        localStorage.clear()
        this.$emit('user-logout')
      },
      showCreateArticle(){
        this.$emit('show-createArticle')
      }
    }
}
</script>

<style scoped>
.btn-danger:hover{
  color: red;
  background-color: white;
}
</style>
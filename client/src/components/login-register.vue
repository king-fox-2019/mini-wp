<template>
  <div>
      <!-- <button class="btn btn-primary" @click="setLogin">Login</button> -->
      <register-form v-if="newUser" @set-login="setLogin"></register-form>
      <login-form v-if="!newUser" @set-login="setLogin"></login-form>
      <div class="text-center">
        <a href="#" @click="letsRegister">Login / Register</a>
      </div>
  </div>
</template>

<script>
import registerForm from './register'
import loginForm from './login'
export default {
    name: 'loginRegister',
    components: {
        registerForm,
        loginForm
    },
    data: function(){
        return {
            newUser: false
        }
    },
    methods :{
        setLogin: function(){
            this.$emit('set-login')
        },
        letsRegister: function() {
            this.newUser = !this.newUser
        }
    }
}
</script>

<style>

</style>
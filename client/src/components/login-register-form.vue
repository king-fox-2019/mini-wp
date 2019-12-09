<template>
  <div>
    <RegisterForm
      v-if="whatToDisplay === 'register'"
      v-on:change-display="changeDisplay"
      v-on:passingToken="sentToken"
      >
    </RegisterForm>
    <LoginForm
      v-if="whatToDisplay === 'login'"
      v-on:change-display="changeDisplay"
      v-on:passingToken="sentToken"
      >
    </LoginForm>
  </div>
</template>

<script>
import RegisterForm from './RegisterForm.vue'
import LoginForm from './LoginForm.vue'

export default {
  data: function () {
    return {
      whatToDisplay: 'register' // 'register', 'login'
    }
  },
  name: 'login-register-form',
  components: {
    RegisterForm,
    LoginForm,
  },
  methods: {
    changeDisplay(display) {
      this.whatToDisplay = display
    },
    sentToken(token) {
      this.$emit('passingToken', token)
    }
  }
}
</script>

<style>

</style>

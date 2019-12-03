<template>
  <div
    class="container row mx-auto justify-content-center align-items-center"
    ref="signInContainer"
  >
    <b-jumbotron
      header-level="5"
      bg-variant="main-bg"
      class="col-12 d-flex text-center pb-0 mb-0"
      id="landing-page"
      fluid
    >
      <template v-slot:header>Sign In</template>
    </b-jumbotron>
    <b-form
      class="col-12 col-md-8 col-lg-6 col-xl-5 align-self-start"
      @submit.prevent="onSubmit"
      novalidate
    >
      <b-form-group label-for="emailUsername">
        <b-form-input
          id="emailUsername"
          v-model.trim="emailUsername"
          type="text"
          :state="emailUsernameValid"
          placeholder="Username or Email"
          @focus="emailUsernameValid = null"
          required
        ></b-form-input>
        <!-- <b-popover
          target="username"
          placement="right"
          variant="danger"
          content="Username cannot empty!"
          triggers=""
          :show.sync="emptyUsername"
        ></b-popover> -->
      </b-form-group>

      <b-form-group label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          :state="passwordValid"
          placeholder="Password"
          @focus="passwordValid = null"
          required
        ></b-form-input>
        <!-- <b-popover
          target="password"
          placement="right"
          variant="danger"
          content="Password cannot empty!"
          triggers=""
          :show.sync="passwordValid"
        ></b-popover> -->
      </b-form-group>

      <b-button type="submit" variant="primary">Sign In</b-button>
    </b-form>
  </div>
</template>

<script>
import checkSession from '@/utils/checkSession'

export default {
  name: 'SignIn',
  data() {
    return {
      emailUsername: '',
      password: '',
      emailUsernameValid: null,
      passwordValid: null
    }
  },
  methods: {
    onSubmit() {
      let isValid = true
      const { emailUsername, password } = this
      if (!emailUsername) {
        this.emailUsernameValid = false
        isValid = false
      }
      if (!password) {
        this.passwordValid = false
        isValid = false
      }
      if (isValid) {
        const loader = this.$loading.show({
          container: this.$refs.signInContainer
        })
        this.$store
          .dispatch('onSignIn', {
            emailUsername,
            password
          })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            localStorage.setItem('access_token', data.data.access_token)
            this.$store.commit('CHANGE_SESSION', true)
            this.$router.push('/explore')
          })
          .catch(({ response }) => {
            this.emailUsernameValid = null
            this.passwordValid = null
            this.password = ''
            const message = response.data.message
            if (typeof message != 'string') {
              response.data.message.forEach(msg => {
                this.$toasted.show(msg, { className: 'bg-danger' })
              })
            } else {
              this.$toasted.show(response.data.message, {
                className: 'bg-danger'
              })
            }
          })
          .finally(() => loader.hide())
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      checkSession()
        .then(() => {
          next('/explore')
        })
        .catch(() => {
          localStorage.clear()
          next()
        })
    } else next()
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>

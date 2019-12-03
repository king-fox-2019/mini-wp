<template>
  <div
    class="container row mx-auto justify-content-center align-items-center"
    ref="signUpContainer"
  >
    <b-jumbotron
      header-level="5"
      bg-variant="main-bg"
      class="col-12 d-flex text-center pb-0 mb-0"
      id="landing-page"
      fluid
    >
      <template v-slot:header>Sign Up</template>
    </b-jumbotron>
    <b-form
      class="col-12 col-md-8 col-lg-6 col-xl-5 align-self-start"
      @submit.prevent="onSubmit"
      novalidate
    >
      <b-form-group
        label-for="username"
        description="Must only contains lowercase letters, numbers, dots and/or underscores."
      >
        <b-form-input
          id="username"
          v-model.trim="username"
          type="text"
          placeholder="Username"
          :state="validateUsername"
          @focus="emptyUsername = false"
          required
        ></b-form-input>
        <b-popover
          target="username"
          placement="right"
          variant="danger"
          content="Username cannot empty!"
          triggers=""
          :show.sync="emptyUsername"
        ></b-popover>
      </b-form-group>

      <b-form-group
        label-for="email"
        description="Must be a valid email format."
      >
        <b-form-input
          id="email"
          v-model.trim="email"
          type="email"
          placeholder="Email"
          :state="validateEmail"
          @focus="emptyEmail = false"
          required
        ></b-form-input>
        <b-popover
          target="email"
          placement="right"
          variant="danger"
          content="Email cannot empty!"
          triggers=""
          :show.sync="emptyEmail"
        ></b-popover>
      </b-form-group>

      <b-form-group
        label-for="password"
        description="Must have at least 6 characters."
      >
        <b-form-input
          id="password"
          v-model.trim="password"
          type="password"
          placeholder="Password"
          :state="validatePassword"
          @focus="emptyPassword = false"
          required
        ></b-form-input>
        <b-popover
          target="password"
          placement="right"
          variant="danger"
          content="Password cannot empty!"
          triggers=""
          :show.sync="emptyPassword"
        ></b-popover>
      </b-form-group>

      <b-form-group label-for="full-name">
        <b-form-input
          id="full-name"
          v-model.trim="fullName"
          type="text"
          placeholder="Full Name (Optional)"
          :state="validateFullName"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      fullName: '',
      emptyUsername: false,
      emptyEmail: false,
      emptyPassword: false
    }
  },
  methods: {
    onSubmit() {
      let isValid = true
      const { username, email, password, fullName } = this
      if (!username) {
        this.emptyUsername = true
        isValid = false
      }
      if (!email) {
        this.emptyEmail = true
        isValid = false
      }
      if (!password) {
        this.emptyPassword = true
        isValid = false
      }
      if (
        isValid &&
        this.validateUsername &&
        this.validateEmail &&
        this.validatePassword &&
        this.validateFullName != false
      ) {
        const loader = this.$loading.show({
          container: this.$refs.signUpContainer
        })
        this.$store
          .dispatch('onSignUp', {
            username,
            email,
            password,
            fullName: fullName || undefined
          })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.$router.push('/')
          })
          .catch(({ response }) => {
            if (response.data.message.length) {
              response.data.message.forEach(msg => {
                this.$toasted.show(msg, { className: 'bg-danger' })
              })
            } else {
              this.$toasted.show(response.data.message, {
                className: 'bg-danger'
              })
            }
          })
          .finally(() =>
            setTimeout(() => {
              loader.hide()
            }, 5000)
          )
      }
    }
  },
  computed: {
    validateUsername() {
      return this.username ? /^[a-zA-Z0-9_.]+$/.test(this.username) : null
    },
    validateEmail() {
      return this.email
        ? // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.email
          )
        : null
    },
    validatePassword() {
      return this.password ? this.password.length >= 6 : null
    },
    validateFullName() {
      return this.fullName ? /^[A-Za-z ]+$/.test(this.fullName) : null
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>

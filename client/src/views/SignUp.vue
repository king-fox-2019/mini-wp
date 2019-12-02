<template>
  <div class="container row mx-auto justify-content-center align-items-center">
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
        label="Username"
        label-for="username"
        description="Must only contains lowercase letters, numbers, dots and/or underscores."
      >
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          placeholder="dummy"
          :state="validateUsername"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Email"
        label-for="email"
        description="Must be a valid email format."
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          placeholder="dummy@mail.com"
          :state="validateEmail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password"
        description="Must have at least 6 characters."
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="******"
          :state="validatePassword"
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
      password: ''
    }
  },
  method: {
    onSubmit() {}
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>

<template>
  <div
    class="container w-50 d-flex flex-column justify-content-center align-items-center"
  >
    <b-jumbotron
      header-level="5"
      bg-variant="main-bg"
      class="d-flex text-center align-items-center mb-4 py-0"
      id="landing-page"
      fluid
    >
      <template v-slot:header>Sign Up</template>
    </b-jumbotron>
    <b-form @submit="onSubmit" novalidate>
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>

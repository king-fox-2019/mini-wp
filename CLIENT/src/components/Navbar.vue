<template>
  <nav class="ui top fixed menu">
    <a class="item nav-brand" @click="redirectHome">
        <img
          src="https://images.vexels.com/media/users/3/145138/isolated/preview/1de68bf333344dc5a6efca43807cfc6d-sun-small-line-beams-icon-by-vexels.png"
          alt="readiant-logo">
        <div class="middle aligned content">
          <h3 class="px-2">Readiant</h3>
        </div>
    </a>
    <div class="right menu">
      <div class="item">

        <div class="ui buttons">
          <button
            v-if="isLoggedIn"
            @click="logout" 
            class="ui yellow button"
            >Log out</button>

          <button
            v-if="!isLoggedIn"
            @click="toggleLoginForm" 
            class="ui yellow button"
            >Log in</button>
          <div 
            v-if="!isLoggedIn"
            class="or"
            ></div>
          <button
            v-if="!isLoggedIn"
            @click="toggleRegisForm" 
            class="ui button text-white"
            >Register</button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$emit('log-out')
    },
    toggleRegisForm: function () {
      this.$emit('toggle-regis-form')
    },
    toggleLoginForm: function () {
      this.$emit('toggle-login-form')
    },
    redirectHome: function () {
      this.$emit('redirect-home')
    }
  },
  props: ['isLoggedIn']
}
</script>

<style>

</style>
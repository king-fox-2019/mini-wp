<template>
  <b-jumbotron
    header-level="1"
    bg-variant="main-bg"
    class="d-flex text-center align-items-center m-0"
    id="landing-page"
    fluid
  >
    <template v-slot:header>TYPRESS</template>
    <template v-slot:lead>
      Wordpress-like app to share your thoughts and ideas
    </template>
    <div class="mt-5">
      <h5 class="mb-3">Ready to dive in?</h5>
      <b-button variant="outline-primary" size="lg" to="signup"
        >Get Started</b-button
      >
    </div>
  </b-jumbotron>
</template>

<script>
import checkSession from '@/utils/checkSession'

export default {
  name: 'LandingPage',
  created() {
    if (localStorage.getItem('access_token')) {
      const loader = this.$loading.show()
      checkSession()
        .then(({ data }) => {
          this.$store.commit('CHANGE_USER', data.data)
          this.$store.commit('CHANGE_SESSION', true)
          this.$router.replace('/dashboard')
        })
        .catch(() => {
          localStorage.clear()
          this.$store.commit('CHANGE_SESSION', false)
        })
        .finally(() => loader.hide())
    }
  }
}
</script>

<style lang="scss" scoped>
#landing-page {
  height: 100%;
}
</style>

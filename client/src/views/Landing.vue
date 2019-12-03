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
export default {
  name: 'LandingPage'
}
</script>

<style lang="scss" scoped>
#landing-page {
  height: 100%;
}
</style>

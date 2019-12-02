<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
    <b-navbar-brand :to="onSession ? 'explore' : 'landing'"
      >TYPRESS</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="onSession">
        <b-nav-item to="landing">Dashboard</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item-dropdown text="Alif Taufik" right>
          <b-dropdown-item to="profile">Profile</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="signout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item to="signup" active-class="active">Sign Up</b-nav-item>
        <b-nav-item to="signin" active-class="active">Sign In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: {
    onSession: Boolean
  },
  data() {
    return {}
  },
  computed: {
    activePage() {
      return this.$route.path
    }
  }
}
</script>

<style></style>

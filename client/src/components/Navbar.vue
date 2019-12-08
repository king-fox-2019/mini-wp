<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
    <b-navbar-brand :to="onSession ? '/dashboard' : '/'" active-class="active"
      >TYPRESS</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="onSession">
        <b-nav-item to="/explore" active-class="active">Explore</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item-dropdown
          :text="user ? user.fullName || user.email : ''"
          right
        >
          <b-dropdown-item to="profile" active-class="active"
            >Profile</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active-class="active" @click="signOut"
            >Sign Out</b-dropdown-item
          >
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
  data() {
    return {}
  },
  computed: {
    onSession() {
      return this.$store.state.onSession
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('onSignOut')
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <b-navbar toggleable="lg" type="light" variant="info" fixed="top">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="onSession" id="write-nav">
        <b-nav-item to="/dashboard">
          <b-button
            class="secondary-action"
            pill
            variant="outline-secondary"
            active-class="active"
            >Cancel</b-button
          >
        </b-nav-item>
        <b-nav-item>
          <b-button
            class="secondary-action"
            pill
            variant="outline-primary"
            active-class="active"
            >Save</b-button
          >
        </b-nav-item>
        <b-nav-item>
          <b-button
            class="main-action"
            pill
            variant="outline-primary"
            active-class="active"
            >Post Now</b-button
          >
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else-if="onSession">
        <b-nav-item to="/explore" active-class="active">Explore</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item-dropdown text="Alif Taufik" right>
          <b-dropdown-item to="profile" active-class="active"
            >Profile</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active-class="active" @click="signOut"
            >Sign Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
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
    activePage() {
      return this.$route.path
    },
    onSession() {
      return this.$store.state.onSession
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

<style lang="scss" scoped>
#write-nav {
  .main-action {
    margin-left: 0.5rem;
    width: 8rem;
  }

  .secondary-action {
    width: 4.7rem;
  }
}
</style>

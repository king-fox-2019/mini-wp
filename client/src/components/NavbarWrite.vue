<template>
  <b-navbar
    class="py-1"
    toggleable="lg"
    type="light"
    variant="info"
    fixed="top"
  >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav id="write-nav">
        <b-nav-item>
          <b-button
            class="secondary-action"
            pill
            variant="outline-secondary"
            active-class="active"
            @click="$emit('on-cancel')"
            >Cancel</b-button
          >
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-button
            class="secondary-action"
            pill
            variant="outline-primary"
            active-class="active"
            @click="$emit('on-save')"
            >Save</b-button
          >
        </b-nav-item>
        <b-nav-item>
          <b-button
            class="main-action"
            pill
            variant="primary"
            active-class="active"
            @click="$emit('on-post')"
            >Post Now
          </b-button>
        </b-nav-item>
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
    }
  }
}
</script>

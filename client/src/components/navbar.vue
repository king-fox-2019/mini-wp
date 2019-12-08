<template>
  <div>
    <ul class="nav justify-content-center navbar-dark bg-dark">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >My Site</a>
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
            @click.prevent="sentPageToDisplay('post')"
            href="#"
          >Post an article</a>
          <a
            class="dropdown-item"
            @click.prevent="sentPageToDisplay('myarticle')"
            href="#"
          >My articles</a>
          <a class="dropdown-item" @click.prevent="logout" v-show="this.islogged" href="#">Logout</a>
        </div>
      </li>
      <a class="nav-link" @click.prevent="sentPageToDisplay('explore')" href="#">Explore</a>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: ["islogged"],
  data() {
    return {};
  },
  methods: {
    sentPageToDisplay: function(value) {
      this.$emit("pagecontrol", value);
    },
    logout: function() {
      this.$emit("logoutapp");
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
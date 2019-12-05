<template>
  <div class="dashboard">
    <h1>homepage</h1>
    <AllArticle v-if="this.$route.path === '/'"></AllArticle>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import AllArticle from "../components/AllArticle.vue";
export default {
  name: "dashboard",
  components: {
    AllArticle
  },
  data() {
    return {};
  }
};
</script>

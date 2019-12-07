<template>
  <div class="dashboard">
    <allarticle-item v-if="this.$route.path === '/'"></allarticle-item>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import AllArticle from "../components/AllArticle.vue";
export default {
  name: "DashBoard",
  components: {
    "allarticle-item": AllArticle
  },
  data() {
    return {};
  }
};
</script>

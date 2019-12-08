<template>
  <div class="dashboard">
    <allarticle-item
      v-if="this.$route.path === '/'"
      :articles="articles"
      @fetch-articles="fetchArticles"
      @searching-article="searchingArticle"
    ></allarticle-item>
    <router-view @error-create="errorCreate"></router-view>
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
  props: {
    articles: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    fetchArticles() {
      this.$emit("fetch-articles");
    },
    searchingArticle(payload) {
      this.$emit("searching-article", payload);
    },
    errorCreate(payload) {
      this.$emit("error-create", payload);
    }
  },
  computed: {}
};
</script>

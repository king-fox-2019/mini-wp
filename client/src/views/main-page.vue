<template>
  <b-container class="main-container">
    <article-list :articles="articles"></article-list>
  </b-container>
</template>

<script>
import articleList from "../components/article-list";
import axios from "axios";

export default {
  name: "mainPage",
  components: {
    articleList
  },
  data: function() {
    return {
      articles: []
    };
  },

  methods: {
    fetchdata() {
      axios({
        method: "GET",
        url: "http://104.198.20.142:3000/article"
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.fetchdata();
  },
  mounted() {
    this.$root.$on('add-article', article => {
        this.articles.push(article)
    });
  }
};
</script>

<style scoped>
.main-container{
    margin-top: 63px
}
</style>
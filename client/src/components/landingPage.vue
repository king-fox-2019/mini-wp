<template>
  <div>
    <div id="dashboard" class="page-content-wrapper" :style="leftPadding">
      <div class="container" style="padding-top:20px">
        <h1 style="color:grey">Hello {{ articles[0].author.name }}</h1>
        <div v-if="articles.length === 0">
          <h1 style="color: grey;margin-left:50px">
            You have no articles yet!
          </h1>
          <h1 style="color: grey;margin-left:50px">
            Let's create today
          </h1>
        </div>
        <div v-if="articles.length !== 0">
          <h1 style="color: grey;margin-left:50px">
            You have {{ articles.length }} articles
          </h1>
          <h1 style="color: grey;margin-left:50px">
            Let's share more articles with internet users!
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import moment from "moment";

export default {
  props: ["leftPadding"],
  data() {
    return {
      articles: [],
      errors: ""
    };
  },
  methods: {
    slicedContent(article) {
      const content = article.content.replace(/(<img.+>)/g, "");
      if (content.length > 150) {
        return content.slice(0, 150) + "...";
      } else return content;
    },
    getTime(article) {
      return moment(article).format("ll");
    },
    fetchArticles() {
      axios({
        method: "GET",
        url: "/articles"
      })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
          this.errors = err;
        });
    },
    toShowArticleDetail(article) {
      this.$emit("to-show-article-detail", {
        page: "detail-page",
        data: article
      });
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>

<style></style>

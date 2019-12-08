<template>
  <div>
    <div id="dashboard" class="page-content-wrapper" :style="leftPadding">
      <div class="container" style="padding-top:20px">
        <h1 v-if="articles.length > 0" style="color:grey">
          Articles By {{ articles[0].author.name }}
        </h1>
        <h1
          v-if="articles.length === 0"
          style="height:73vh;color: grey"
          class="d-flex justify-content-center align-items-center"
        >
          Sorry, you have no articles yet!
        </h1>
        <div
          v-if="articles.length > 0"
          id="content"
          style="height:73vh;overflow: scroll;border: 1px solid grey !important;padding: 15px"
        >
          <div
            class="card mb-3 rounded-0"
            style="width: 100%;background-color: #D7D7D7;color:grey;border: 0px solid grey"
            v-for="article in articles"
            :key="article.id"
          >
            <div class="card-body">
              <div class="media">
                <img
                  v-if="article.featured_image"
                  :src="article.featured_image"
                  class="align-self-center mr-3"
                  width="200px"
                  height="150px"
                  alt="Thumbelnail Article"
                />
                <div class="media-body">
                  <h1 class="mt-0">{{ article.title }}</h1>
                  <p>
                    <i class="fa fa-user-circle"></i> {{ article.author.name }}
                    <i class="fa fa-calendar-alt ml-3"></i>
                    {{ getTime(article.createdAt) }}
                  </p>
                  <div
                    v-html="slicedContent(article)"
                    style="text-align: justify"
                  ></div>
                  <a
                    class
                    href="#"
                    role="button"
                    @click.prevent="toShowArticleDetail(article)"
                    >Read More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  props: ["leftPadding"],
  data() {
    return {
      articles: []
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
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "GET",
        url: "/articles",
        headers: { access_token }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "Okay"
          });
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

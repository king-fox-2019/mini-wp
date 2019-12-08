<template>
  <div class="container" id="image-container">
    <br>
    <b-field grouped>
      <b-input placeholder="Title" expanded v-model="title"></b-input>
      <b-input placeholder="Tag" expanded v-model="tags"></b-input>
      <p class="control">
        <button class="button is-primary" @click="getArticles">Search</button>
      </p>
    </b-field>
    <hr>
    <ArticleCard v-for="(article, i) in articles" :key="i" :ArticleData="article"></ArticleCard>
  </div>
</template>

<script>
import axios from "../../apis/axios"
import Swal from 'sweetalert2'
import ArticleCard from "./ArticleCard"

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	timer: 1500
})

export default {
  name: "ArticlePage",
  components: {
    ArticleCard
  },
  props: ["ArticleData"],
  data() {
    return {
      articles: [],
      title: "",
      tags: "",
    };
  },
  methods: {
    getArticles() {
      axios({
        method: "GET",
        url: `/articles?title=${this.title}&tags=${this.tags}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          if(data.length == 0) {
            Toast.fire({
              icon: 'error',
              title: 'No article found, try another keywords'
            })
          } else {
            this.articles = data
            this.title = ""
            this.tags = ""
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(", "),
            position: "is-top",
            type: "is-danger"
          });
        })
    }
  },
  mounted() {
    this.getArticles();
  }
};
</script>

<style></style>
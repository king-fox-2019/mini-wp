<template>
  <div id="blog" class="container border text-justify" style="width: 60%" >
    <div class="blog-post mx-5 my-5">
      <span>Written by: {{ author }}</span>
      <br>
      <span class="date">{{ date.slice(0, 10) }}</span>
      <br>
      <article class="article-content">
        <h3 class="article-title">{{ title }}</h3>
        <img :src="featuredImage" width="100%" height="100%"/>
        <div class="ql-editor" v-html="content" ></div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "../../apis/server";
import Swal from "sweetalert2";

export default {
  props: ["articleId"],
  data() {
    return {
      title: "",
      content: "",
      date: "",
      author: "",
      featuredImage: ""
    }
  },
  methods: {
    showArticle() {
      axios.get(`/articles/${this.articleId}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        this.title = data.title;
        this.content = data.content;
        this.date = data.created_at;
        this.featuredImage = data.featured_image;
        return axios.get(`/user/${data.author}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
      })
      .then(({ data }) => {
        this.author = data.username
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: err
        })
      })
    }
  },
  created() {
    this.showArticle()
  }
}
</script>

<style>

</style>
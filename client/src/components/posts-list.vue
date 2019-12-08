<template>
  <div id="list-posts" class="my-2 container" style="width: 70%">
    <h4 h4 class="my-4 mx-1">Posts</h4>
    <b-list-group>
      <b-list-group-item class="d-flex align-items-center" v-for="article in articles" :key="article._id">
        <h6 class="title-list my-0">{{ article.title }}</h6>
        <div class="my-0 ml-auto">
          <span class="my-0 mr-4">{{ article.created_at.slice(0, 10) }}</span>
          <b-dropdown>
            <b-dropdown-item @click.prevent="showPost(article._id)">View</b-dropdown-item>
            <b-dropdown-item @click.prevent="showEditPost(article._id)">Edit</b-dropdown-item>
            <b-dropdown-item @click.prevent="deletePost(article._id)">Delete</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from "../../apis/server"
import Swal from "sweetalert2";

export default {
  name: "posts-list",
  data() {
    return {
      articles: []
    }
  },
  methods: {
    fetchData() {
      axios.get("/user/myArticles", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },

    showEditPost(articleId) {
      this.$emit("setArticleId", articleId)
      this.$emit("changeView", "canvas")
    },

    showPost(articleId) {
      this.$emit("setArticleId", articleId)
      this.$emit("changeView", "blog")
    },

    deletePost(articleId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`/articles/${articleId}`, {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
            .then(({ data }) => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              this.fetchData();
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err
              })
            })
        }
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style>

</style>
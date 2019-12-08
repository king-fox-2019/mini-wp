<template>
  <div>
  <!-- {{article}} -->
  <p>{{article.title}}</p>
  <!-- {{typeof article.image}} -->
  <!-- <p>by {{localStorage.getItem('email').split('@')[0]}}</p> -->
  <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV2SyvI7n6wm0wDFA5E4WRyijolIZj55EEUGPr2s22ybGzaNYa" size="big" /> -->
  <!-- <sui-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV2SyvI7n6wm0wDFA5E4WRyijolIZj55EEUGPr2s22ybGzaNYa" size="big" /> -->
  <sui-image :src="String(article.image)" size="big" ></sui-image>
  <sui-button @click="$router.push('/edit-article/' + article._id)" v-if="isMine">edit</sui-button>
  <sui-button @click="remove" v-if="isMine">delete</sui-button>



  {{article.content}}
  </div>
</template>

<script>
import axios from "../helpers/axios";

export default {
  name: "detail-article",
  data: function() {
    return {
      article : {}
    }
  },
  methods: {
    fetchDetailArticle() {
      axios
        .get(`/articles/${this.$route.params.id}`)
        .then(({ data }) => {
          this.article = data
        })
        .catch(console.log);
    },
    remove() {

      axios
        .delete(`/articles/${this.$route.params.id}`, {
          headers: {
            access_token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.$router.push('/')
          this.$toastr
            .h('Article')
            .i('Deleted!')
        })
        .catch(console.log) //toast
    }
  },
  created() {
    this.fetchDetailArticle()
  },
  computed: {
    isMine() {
     return localStorage.getItem('userId') === this.article.user
      
    }
  }
};
</script>

<style scoped>
</style>
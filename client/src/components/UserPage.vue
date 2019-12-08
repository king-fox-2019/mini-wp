<template>
  <div>
    <h1> Manage Your Articles </h1>
    <hr>
    <UserArticleCard v-for="(userArticle, i) in articles" :key=i :UserArticleData=userArticle @fetch-user-articles="getUserArticles" @update-article="updateArticle"></UserArticleCard>
    <br>
  </div>
</template>

<script>
import axios from "../../apis/axios"
import UserArticleCard from "../components/UserArticleCard"

export default {
  name: "UserPage",
  props: ['UserArticleData'],
  components: {
    UserArticleCard
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getUserArticles(){
      axios({
        method: 'GET',
        url: '/articles/personal',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(', '),
            position: 'is-top',
            type: 'is-danger'
          })
        })
    },
    updateArticle(articleData) {
      this.$emit('update-article', articleData)
      this.$emit('switch-page', 'update')
    }
  },
  mounted(){
    this.getUserArticles()
  }
}
</script>

<style>

</style>
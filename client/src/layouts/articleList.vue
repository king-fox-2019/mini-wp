<template>
  <div id="article-list" class="d-flex flex-column align-items-center">
     <div class="article-list-wrapper">
        <ArticleCard v-for="article in articles" v-bind:key="article._id"></ArticleCard>
     </div>
  </div>
</template>

<script>
import axios from '../../apis/server'
import ArticleCard from '../components/articleCard'

export default {
   name: 'articleList',
   data() {
      return {
         articles: []
      }
   },
   components: {ArticleCard},
   methods: {
      fetchArticles() {
         axios({
            url: '/article',
            method: 'get',
            headers: {
               access_token: localStorage.getItem('access_token')
            }
         })
         .then(({data}) => {
            console.log(data.articles)
            this.articles = data.articles
         })
         .catch(error => console.log(error))
      }
   },
   created() {
      this.fetchArticles()
   }
}
</script>

<style scoped>
   #article-list {
      width: 100%;
   }
   .article-list-wrapper {
      width: 80%
   }
</style>
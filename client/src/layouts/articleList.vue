<template>
  <div id="article-list">
     
  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'articleList',
   data() {
      return {
         articles: []
      }
   },
   methods: {
      fetchArticles() {
         axios({
            url: '/',
            method: 'get'
         })
         .then(({data}) => {
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

<style>

</style>
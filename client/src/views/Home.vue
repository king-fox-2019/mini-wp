<template>
  <div class="contained">
    <p>DISCOVER</p>
    <p>Find book picks, reading tips, and activities for your little ones</p>
    <Topics></Topics>
    <TopArticle></TopArticle>
    <Articles :articles="articles"></Articles>

    <!-- styling discover banner  -->

    <!-- <Tags></Tags>
    <TopArticles></TopArticles> -->
  </div>
</template>

<script>
import axios from '../helpers/axios'
import TopArticle from '../components/TopArticle'
import Articles from '../components/Articles'
import Topics from '../components/Topics'

export default {
  name: 'Home',
  data: function() {
    return {
      articles : []
    }
  },
  components : {
    TopArticle,
    Articles,
    Topics
  },
  methods : {
     fetchArticle() {
      console.log("dapet get article");
      axios.get('/articles')
        .then(({data}) => {
          console.log(data, "findall article dr app.vue");
          this.articles = data
        })
        .catch(console.log)
    }
  },
  created() {
    // if (localStorage.getItem('access_token')) {
    //   this.isLogin = true
    // }
    this.fetchArticle()
  }
}
</script>

<style>

</style>
<template>
  <div >
    <div style="margin-bottom:20px;padding:20px;border-bottom: 4px solid rgba(0,0,0,.3);border-bottom-style:double" v-for="(article,i) in articles" v-bind:key="i">
      <h2>{{article.title}}</h2>
      <div class="text-center">
        <img class="img-fluid" :src="article.featured_image" alt="">
      </div>
      <p v-html="article.content"></p>
      <p><b><i>Author: {{article.author}} </i></b></p>
      <p><b><i>Created: {{article.created_at.slice(0,10)}}</i></b></p>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  name:"articles",
  data() {
    return {
      articles:[]
    };
  },
  methods: {
    getArticles: function(){
      axios.get('/article')
      .then(articles=>{
        for(let article of articles.data){
          this.articles.push(article)
        }
      })
      .catch(err=>console.log(err))
    }
  },
  created() {
    this.getArticles()
  }
};
</script>

<style>
</style>
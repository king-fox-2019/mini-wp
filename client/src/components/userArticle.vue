<template>
  <div>
    <div v-if="profile==='profile'">
      <h1>Your Articles</h1>
      <div  style="margin-bottom:20px;padding:20px;border-bottom: 4px solid rgba(0,0,0,.3);border-bottom-style:double" v-for="(article,i) in articles" v-bind:key="i">
      <h2>{{article.title}}</h2>
      <div class="text-center">
        <img class="img-fluid" :src="article.featured_image" >
      </div>
      <p v-html="article.content"></p>
      <p>
        <b>
          <i>Author: {{article.author}}</i>
        </b>
      </p>
      <p>
        <b>
          <i>Created: {{article.created_at}}</i>
        </b>
      </p>
      <button type="button" class="btn btn-secondary" @click.prevent="editData(article)">Edit</button>
      <button type="button" class="btn btn-danger" @click.prevent="deleteArticle(article._id)">Delete</button>
    </div>
    </div>
    <editArticle v-if="profile==='edit'" :articleData="edit_article"></editArticle>
  </div>
</template>

<script>
import axios from "../../helpers/axios";
import editArticle from '../components/editArticle'

export default {
  components:{
    editArticle
  },
  data() {
    return{
      articles: [],
      profile:'profile',
      edit_article:{}
    }
  },
  methods: {
    show: function(state){
      this.profile = state
    },
    editData: function(article){
      this.profile='edit'
      console.log(this.profile)
      this.edit_article=article
    },
    getUserArticle: function() {
      axios.get('/article/user',{
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(articles=>{
        for(let article of articles.data){
          this.articles.push(article)
        }
      })
      .catch(err=>console.log(err))
    },
    deleteArticle: function(id){
      console.log(id)
      axios({
        method:'delete',
        url:'/article',
        data:{id},
        headers:{access_token:localStorage.getItem('access_token')}
      })
      .then(result=>{
        this.articles = []
        this.getUserArticle()
      })
      .catch(err=>console.log(err))
    }
  },
  created(){
    this.getUserArticle()
  }
};
</script>

<style>
</style>
<template>
  <div>
    <div v-if="isLogin===true">
      <navbar></navbar>
      <div class="container">
        <addArticle v-if="show==='add'"></addArticle>
        <listArticle v-if="show==='list'" :newArticle="newArticle"></listArticle>
        <profile v-if="show==='profile'"></profile>
      </div>
    </div>
    <div v-else>
      <login v-if="show==='login'"></login>
      <register v-if="show==='register'"></register>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar'
import listArticle from './components/listArticle'
import addArticle from './components/addArticle'
import login from './components/login'
import register from './components/register'
import profile from './components/profile'
export default {
  components:{
    navbar,
    listArticle,
    addArticle,
    login,
    register,
    profile
  },
  data() {
    return {
      show:'list',
      isLogin:false,
      newArticle:''
    };
  },
  methods:{
    toShow:function(status){
      this.show=status
    },
    logout:function(){
      this.isLogin=false
      this.show='login'
    },
    login:function(){
      this.isLogin=true
      this.show='list'
    },
    addArticle:function(article){
      this.newArticle=article
    }
  },
  created(){
    if(!localStorage.getItem('access_token')){
      this.show='login'
      this.isLogin=false
    }
  },
  mounted(){
    if(localStorage.getItem('access_token')){
      this.show='list'
      this.isLogin=true
    }
  }
};
</script>

<style scoped>
</style>
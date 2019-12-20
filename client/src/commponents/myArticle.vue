<template>
  <div>
            <div class="card mt-2" v-for="article in articles" :key="article._id">
                <div class="card-header">
                    {{article.title}}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <div v-html='article.content'></div>
                        <footer class="blockquote-footer"><cite title="Source Title"> By </cite>{{article.author}}</footer>
                        <footer class="blockquote-footer"><cite title="Source Title"> last update at </cite>{{article.created_at.split('T')[0]}}</footer>
                        <button  @click ='destroy(article._id)'   class="btn btn-danger btn-lg btn-block">DELETE</button>
                        <button  @click ='update(article._id)' class="btn btn-secondary btn-lg btn-block" type="button" data-toggle="modal" data-target="#exampleModal">UPDATE</button>  
                    </blockquote>
                </div>
            </div> 
  </div>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'

export default {
  name: "myArticle",
  data(){
      return{
          articles :[]
      }
  },
  methods: {
    myArticle(){
        this.$emit('set-status', 'myArticle')
    },
    destroy: function(id){
      axios({
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'delete',
      })
      .then(({data}) => {
       this.getData()
      })
      .catch(function (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "this is not your article"
          })
      })
    },
    update: function(id){
      axios({
        url: `http://localhost:3000/${id}`,
        method: 'get',
      })
      .then(({data}) => {
        this.tempId = data._id
        this.status = 'updateArticle'
        this.title = data.title
        this.quill2.root.innerHTML = data.content
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    getData : function(){
          axios({
            url: 'http://localhost:3000/articles',
            method: 'GET',
            headers:{
              token: localStorage.getItem("token")
            }
          })
          .then(({data}) => {
         this.articles = data
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  },
  created(){
       this.getData()
  }
}
</script>

<style>
</style>
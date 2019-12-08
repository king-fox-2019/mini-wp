<template>


    <div style="margin-top:40px">
        <!-- <h1>filename: bodyContent.vue</h1>  -->


        <div class="card-columns">
        
        <div v-for="(article, x) in articleArray" :key="x">
            <div class="card shadow p-3 bg-white rounded">
                <img class="card-img-top" :src="article.featured_image"  alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text" v-html="article.content"></p>
                <div>
                    <p class="card-text">Author: {{ article.authorId.username }}  
                    <button type="button" class="btn btn-outline-secondary" style="float:right" @click="deleteArticle(article._id)">x</button> </p>
                </div>
                </div>
                
            </div>
        </div>


        </div>


    </div>   

</template>





<script>
import axios from 'axios';
import Swal from 'sweetalert2'


export default {
    data: function(){
        return {
            articleArray : []
        }
    },
    methods:{
        fetchData()
          {
              axios({
                  method: 'get',
                  url: 'http://localhost:3000/articles/all',
                  headers:{
                      access_token : localStorage.getItem('access_token')
                  }
              })
              .then(result=>{
                  this.articleArray = result.data
                  this.$emit('setArticleArray', this.articleArray)
              })
              .catch(err=>{
                  Swal.fire(
                    err.response.data.code,
                    err.response.data.message,
                    'error'
                  )
              })
          },
        deleteArticle(articleId)
          {
              Swal.fire({
                  title:'Delete Article',
                  text:'Confirm Deleting this Article?',
                  icon: 'warning',
                  showCancelButton: true
              })
              .then(result=>{
                  if(result.value)
                    {
                        axios({
                            method: 'delete',
                            url: 'http://localhost:3000/articles/delete',
                            headers:{
                                access_token : localStorage.getItem('access_token')
                            },
                            data:{
                                articleId
                            }
                        })
                        .then(result =>{
                            console.log(result)
                            Swal.fire(
                                'delete success'
                            )
                            this.fetchData()
                        })
                        .catch(err=>{
                            Swal.fire(
                                err.response.data.status,
                                err.response.data.message,
                                'warning'
                            )
                        })
                    }
              })
               
          }
    },
    mounted: function(){
        this.fetchData()
    }


}


</script>





<style>


.card
{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.10)
    
}

</style>
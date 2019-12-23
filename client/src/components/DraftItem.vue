<template>
  <div>
    <div class="d-flex mb-2" v-for="(data, index) in draft" :key="index">
      <div class="mr-5">
        <h2>{{ index+1 }}</h2>
      </div>
      <div class="d-flex">
        <img :src="data.featured_image" class="mr-3" alt="" width="128px" height="128px">
      </div>
      <div class="d-flex flex-column container justify-content-between">
        <div class="">
          <p class="mt-0 draft-title">{{ data.title }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <button class="btn btn-primary" @click.prevent="editArticle(data._id)">Edit</button>
            <button class="btn btn-success" @click.prevent="postArticle(data._id)">Post</button>
          </div>
          <div>
            <button class="btn btn-danger" @click.prevent="deleteArticle(data._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import articleServer from '../../api/article'
import Alert from '../public/Alert'

export default {
    data(){
      return {}
    },
    props: ['draft'],
    methods:{
      editArticle(id){
        this.$emit('edit-article', id)
      },
      postArticle(id){
        articleServer({
          url: `/${id}`,
          method: 'PUT',
          headers:{
            access_token: localStorage.getItem('token')
          },
          data:{
            status: 'publish'
          }
        })
        .then(({data})=>{
          Alert.Toast.fire({
            icon: 'success',
            title: 'Post Article',
            text: 'Post Success!'
          })
          this.$emit('go-draft')
        })
        .catch(err => {
          Alert.Swal.fire({
            icon: 'error',
            title: 'Post Article',
            text: `${err.response.data.message}` 
          })
        })
      },
      deleteArticle(id){
        articleServer({
          url: `/${id}`,
          method: 'DELETE',
          headers:{
            access_token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          Alert.Toast.fire({
            icon: 'success',
            title: 'Delete Article',
            text: 'Delete Success!'
          })
          this.$emit('go-draft')
        })
        .catch(err => {
          Alert.Swal.fire({
            icon: 'error',
            title: 'Post Article',
            text: `${err.response.data.message}` 
          })
        })
      }
    }
}
</script>

<style scoped>
.draft-title{
  font-size: 20px;
}

.draft-title:hover{
  cursor: pointer;
  color: blue;
}
</style>
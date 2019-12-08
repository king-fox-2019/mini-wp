<template>
  <div>
    <h1 v-if='postList.length == 0'>You don't have any post</h1>
    <b-card-group>
      <b-card
        :title=post.title
        v-for='post in postList'
      >
        <b-card-img 
          :src=post.featured_image
        ></b-card-img>
        <b-card-text v-html=post.content>
        </b-card-text>
        <b-card-text class="small text-muted">Created at {{post.createdAt.split('T')[0]}}</b-card-text>
        <button class="btn btn-primary" @click='editPost(post._id)'>Edit</button>
        <button class="btn btn-danger" @click='deletePost(post._id)'>Delete</button>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
export default {

  name: 'postList',

  data () {
    return {
      postList: []
    }
  },
  methods: {
    fetchData(){
      axios({
        method:'get',
        url: 'http://localhost:3000/todo',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.postList = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deletePost(id){
      axios({
        method: 'delete',
        url: `http://localhost:3000/todo/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((data) => {
          this.fetchData()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editPost(id){
      this.$emit('show', 'edit')
      this.$emit('editForm', id)
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped>
.card{
  min-width: 30%;
  max-width: 30%;
}
</style>
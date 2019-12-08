<template>
  <div>
    <topNavbar @show='show'></topNavbar>
    <h1 v-if='!showPage'>Welcome to Mini WP</h1>
    <postList @editForm='editForm' @show='show' v-if='showPage == "list"'></postList>
    <postForm @show='show' v-if='showPage == "form"'></postForm>
    <editForm @show='show' v-if='showPage == "edit"' :postId='postId'></editForm>
  </div>
</template>

<script>
import topNavbar from '../components/topNavbar'
import postList from '../components/postList'
import postForm from '../components/postForm'
import editForm from '../components/editForm'
export default {

  name: 'mainPage',
  components:{
    topNavbar,
    postList,
    postForm,
    editForm
  },

  data () {
    return {
      showPage: '',
      postId: ''
    }
  },
  methods: {
    show(page){
      this.showPage = page
    },
    editForm(id){
      this.postId = id
    }
  }
}
</script>

<style>
  h1{
    display: flex;
    align-items: center;
    justify-content: center;  
    height: 50vh;
  }
</style>
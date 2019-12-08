<template>
  <div class="demo-blog demo-blog--blogpost mdl-layout mdl-js-layout has-drawer is-upgraded">
      <main class="mdl-layout__content">
        <div class="demo-blog__posts mdl-grid">
          <navbar @showArticle="showWindow" @showAdd="summonAdd" @logout="logout"></navbar>
          <detailArticle @back-detail="detailBack" v-if="page == 'detail'" :idArticle='detailArticleId' @editArticle="editArticle"></detailArticle>
          <div v-if="page == 'list'">
            <itemArticle v-for="(article, id) in shownArticle" :key="id" :article="article" @see-detail="detailClick" @fetchTag="fetchTagArticle"></itemArticle>
          </div>
          <addForm @addcomplete="successAdd" v-if="page == 'addform'"></addForm>
          <editForm @editcomplete="successAdd" v-if="page=='editForm'" :idArticle='editId'></editForm>
        </div>
      </main>
  </div>
</template>

<script>
import navbar from '../components/nav'
import detailArticle from '../components/detail'
import itemArticle from '../components/item'
import addForm from '../components/add-form'
import editForm from '../components/edit-form'
import axios from 'axios';
export default {
  data() {
    return {
        page : 'list' ,
        detailArticleId:'',
        shownArticle : [],
        editId:''
    };
  },
  components : { navbar, detailArticle, itemArticle, addForm, editForm },
  props : ['loginStatus'],
  methods:{
      editArticle(id){
        this.editId = id
        this.page='editForm'
      },
      logout(){
        this.$emit('logout')
      },
      detailClick(id){
          this.page = 'detail'
          this.detailArticleId = id
      },
      detailBack(){
          this.page = 'list'
          this.fetchArticle()
      },
      summonAdd(){
        this.page = 'addform'
      },
      successAdd(){
          this.page = 'list'
          this.fetchArticle()
      },
      fetchTagArticle(tag){
        axios({
              url:`http://localhost:3000/article/tag/${tag}`,
              method:'get',
              headers:{
                  access_token : localStorage.access_token
              }
          }).then(({data})=>{
              this.shownArticle = data
          }).catch(err => {
              console.log(err)
          })
      },
      fetchUserArticle(){
        axios({
              url:'http://localhost:3000/article/author',
              method:'get',
              headers:{
                  access_token : localStorage.access_token
              }
          }).then(({data})=>{
              this.shownArticle = data
          }).catch(err => {
              console.log(err)
          })
      },
      fetchArticle(){
          axios({
              url:'http://localhost:3000/article',
              method:'get',
              headers:{
                  access_token : localStorage.access_token
              }
          }).then(({data})=>{
              this.shownArticle = data
          }).catch(err => {
              console.log(err)
          })
      },
      showWindow(window){
        switch(window){
          case "all":
              this.page = 'list'
              this.fetchArticle()
            break;
          case "mine":
              this.page = 'list'
              this.fetchUserArticle()
            break;
        }
      }
  },
  watch:{
      loginStatus(value){
          this.fetchArticle()
      }
  }
};
</script>

<style scoped>
</style>
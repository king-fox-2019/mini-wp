<template>
   <div id="left-nav" class="d-flex flex-column px-4 mt-5 align-items-end">
      <!-- <div id="link-wrapper" class="px-3 mt-3"> -->
      <a href="" class="py-2" v-on:click.prevent="changePage('articleList')">Article list</a>
      <a href="" class="py-2" v-on:click.prevent="changePage('articleWrite')">Write new article</a>
      <a href="" class="py-2" v-on:click.prevent="$emit('updateArticle', articleId)" v-if="page == 'articleDetail'">Edit</a>
      <a href="" class="py-2" v-on:click.prevent="deleteArticle(articleId)" v-if="page == 'articleDetail'">Delete</a>
      <!-- </div> -->
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'leftNavbar',
   props: {
      page: String,
      articleId: String
   },
   methods: {
      changePage(pageName) {
         this.$emit('updatePage', pageName)
      },
      // only clickable on detail page
      deleteArticle(articleId) {
         axios({
            url: `/article/${articleId}`,
            method: 'delete',
            headers: {
               access_token: localStorage.getItem('access_token')
            }
         })
         .then(({data}) => {
            this.$emit('updatePage', 'articleList')
         })
         .catch(error => console.log(error))
      }
   }
}
</script>

<style scoped>
   a:hover {
      text-decoration: none;
      color: #39B2AC;
   }

   a {
      color: #718096;
   }

   #left-nav {
      min-width: 13rem;
      font-weight: 500;
   }
</style>
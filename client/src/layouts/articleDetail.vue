<template>
   <div id="article-detail" class="mt-5">
      <h3 class="mb-3">{{this.article.title}}</h3>
      <div class="image-container" v-bind:style="backgroundImage">
         <!-- <img class="" v-bind:src="this.article.image" v-bind:alt="this.article.slug"> -->
      </div>

      <div class="article-content" v-html="this.article.content"></div>
   </div>
</template>

<script>
   import axios from '../../apis/server'

   export default {
      name: 'articleDetail',
      props: {
         article: Object
      },
      data() {
         return {
            backgroundImage: (this.article.image) ?
               `background: url(\'${this.article.image}\') no-repeat center center/cover; height: 37rem; margin-bottom: 1.5rem;` :
               ''
         }
      },
   }
</script>

<style>
   #article-detail {
      padding-right: 6.1803rem;
      padding-left: 6.1803rem;
      padding-bottom: 6.1803rem;
   }
</style>
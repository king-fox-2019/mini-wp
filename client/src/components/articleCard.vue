<template>
  <div class="article-card d-flex flex-column py-3 p-2" v-on:click="readDetail">
     <div class="image-container"
     v-bind:style="image"></div>
     <div class="content">
        <h3>{{article.title}}</h3>
        <div class="article-content" v-html="article.content"></div>
     </div>
  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'articleCard',
   props: {
      article: {}
   },
   data() {
      return {
         image: (this.article.image) ? `background: url(\'${this.article.image}\') no-repeat center center/cover; height: 20rem; margin-bottom: 1.5rem` : '',
         // imageUrl: `background: url(\'${this.profileCard.image}\') no-repeat center center/cover;`,
      }
   },
   methods: {
      readDetail() {
         this.$emit('readDetail', this.article._id)
      }
   }
}
</script>

<style scoped>
   .content {
      max-height: 10rem;
      overflow: hidden;
   }

   .article-card:hover {
      cursor: pointer;
      /* background-color: #e9f1f6; */
      border: #5A67D8 1px solid;
      border-radius: 5px;
   }
   
</style>
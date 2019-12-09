<template>
  <div class="article-card d-flex flex-column">
     <div class="image-container"></div>
     <div class="content">
        <h3>{{article.title}}</h3>
        <div class="article-content" v-html="article.content"></div>
     </div>
  </div>
</template>

<script>
export default {
   name: 'articleCard',
   props: {
      article: {}
   }
}
</script>

<style scoped>
   .article-card {
      max-height: 400px;
   }

   .article-card:hover {
      cursor: pointer;
   }

   .image-container {
      max-height: 200px
   }
   
</style>
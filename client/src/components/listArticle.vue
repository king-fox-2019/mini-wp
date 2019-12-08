<template>
  <div class="container col-md-10">
    <div>
      <h1>Articles</h1>
      <articles></articles>
    </div>
  </div>
</template>

<script>
import articles from "../components/article";
export default {
  components:{
    articles
  },
  props:['newArticle']
};
</script>

<style>
</style>
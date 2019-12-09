<template>
  <div class="row">
    <div class="col-md-8">
      <article-list-item v-for="article in articles" :key="article.id" :article="article" class="article-list-item"></article-list-item>
    </div>
  </div>
</template>

<script>
import articleListItem from './article-list-item'
export default {
  name: "articleList",
  props: ["articles"],
  components: {
      articleListItem
  }
};
</script>

<style scoped>
.article-list-item {
  margin-bottom: 3rem
}
</style>
<template>
  <div>
    <articles_container
      v-bind:articles="articles"
      v-if="whatToShow === 'articles'"
      >
    </articles_container>

    <article_form v-if="whatToShow === 'form'"></article_form>
  </div>
</template>

<script>
import articles_container from './articles-container.vue'
import article_form from './article-form.vue'

export default {
  name: 'home-page',
  data: function () {
    return {
      articles: [],
      whatToShow: 'articles', // articles, form
    }
  },
  components: {
    articles_container,
    article_form,
  }
}
</script>

<style>

</style>

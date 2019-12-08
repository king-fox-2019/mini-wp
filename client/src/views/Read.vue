<template>
  <div
    class="container mx-auto d-flex flex-column align-items-center"
    id="read-article"
  >
    <b-img
      :src="article.featuredImage"
      fluid
      :alt="article.title"
      v-if="article.featuredImage"
    ></b-img>
    <div class="my-5">
      <h1 class="text-center" id="title">{{ article.title }}</h1>
      <p class="my-0">
        By: {{ article.author.fullName || article.author.email }}
      </p>
      <span class="text-muted" style="font-weight: 100;">{{
        formatDate(article.updatedAt)
      }}</span>
    </div>
    <div v-html="article.content"></div>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'

export default {
  props: ['id'],
  data() {
    return {
      article: null
    }
  },
  methods: {
    formatDate(date) {
      return formatRelative(new Date(date), Date.now())
    }
  },
  created() {
    const loader = this.$loading.show()
    this.$store.dispatch('getOneArticle', this.id).then(({ data }) => {
      this.article = data.data
      loader.hide()
    })
  }
}
</script>

<style lang="scss" scoped>
#title {
  font-weight: 200;
  font-size: 4rem;
}

#read-article {
  padding-top: 5rem;
}

@media (min-width: 768px) {
  #read-article {
    width: 65%;
  }
}
</style>

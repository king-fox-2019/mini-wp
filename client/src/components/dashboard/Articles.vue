<template>
  <div class="px-5" id="article-list">
    <!-- <b-card
      v-for="article in articles"
      :key="article._id"
      :title="article.title"
      :img-src="article.featuredImage"
      img-alt="featuredImage"
      img-left
      tag="article"
      class="mb-2 bg-light"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>-->
    <b-card
      no-body
      class="overflow-hidden mb-2 bg-light"
      v-for="article in articles"
      :key="article._id"
    >
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img
            :src="article.featuredImage"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body :title="article.title" :sub-title="article.updatedAt">
            <b-card-text>{{ article.content }}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    articles() {
      return this.$store.state.userArticles
    }
  },
  created() {
    this.$store.dispatch('fetchUserArticles')
  }
}
</script>

<style lang="scss" scoped>
#article-list {
  width: 100%;
  padding-top: 100rem;
}
</style>

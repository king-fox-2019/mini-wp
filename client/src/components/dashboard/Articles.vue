<template>
  <div class="mt-5">
    <div v-for="article in articles" :key="article._id">
      {{ article.title }} {{ article.createdAt }}
    </div>
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

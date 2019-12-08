<template>
  <Articles class="container" :articles="articles" id="article-list"></Articles>
</template>

<script>
import Articles from '@/components/dashboard/Articles'
import checkSession from '@/utils/checkSession'

export default {
  components: {
    Articles
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      const loader = this.$loading.show()
      checkSession()
        .then(({ data }) => {
          this.$store.commit('CHANGE_USER', data.data)
          this.$store.commit('CHANGE_SESSION', true)
          return this.$store
            .dispatch('fetchAllPostedArticles')
            .then(({ data }) => {
              this.articles = data.data
            })
        })
        .catch(() => {
          localStorage.clear()
          this.$store.commit('CHANGE_SESSION', false)
          this.$router.replace('/')
        })
        .finally(() => loader.hide())
    } else this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
#article-list {
  margin-top: 4.5rem;
}

@media (min-width: 960px) {
  #article-list {
    width: 65%;
  }
}
</style>

<template>
  <div>
    <SideNav></SideNav>
    <router-view
      :articles="
        $route.path == '/dashboard'
          ? allArticles
          : $route.path == '/dashboard/posted'
          ? postedArticles
          : $route.path == '/dashboard/draft'
          ? draftArticles
          : $route.path == '/dashboard/draft'
          ? trashArticles
          : []
      "
      id="main-dashboard"
    ></router-view>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav'
import checkSession from '@/utils/checkSession'

export default {
  components: {
    SideNav
  },
  computed: {
    articles() {
      return this.$store.state.userArticles
    },
    allArticles() {
      return this.articles.filter(article => article.status != 'trash')
    },
    postedArticles() {
      return this.articles.filter(article => article.status == 'posted')
    },
    draftArticles() {
      return this.articles.filter(article => article.status == 'draft')
    },
    trashArticles() {
      return this.articles.filter(article => article.status == 'trash')
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      const loader = this.$loading.show()
      checkSession()
        .then(({ data }) => {
          this.$store.commit('CHANGE_USER', data.data)
          this.$store.commit('CHANGE_SESSION', true)
          return this.$store.dispatch('fetchUserArticles')
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
@import '@/assets/scss/main.scss';

@media (min-width: map-get($grid-breakpoints, lg)) {
  #main-dashboard {
    margin-left: 13rem;
    padding-top: 4.5rem;
    height: 100%;
    width: calc(100vw - 13rem);
  }
}

#main-dashboard {
  padding-top: 4.5rem;
  height: 100%;
}
</style>

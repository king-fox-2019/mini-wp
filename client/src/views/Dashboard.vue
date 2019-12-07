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
    const loader = this.$loading.show()
    this.$store.dispatch('fetchUserArticles').then(() => {
      loader.hide()
    })
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      checkSession()
        .then(() => {
          next()
        })
        .catch(() => {
          localStorage.clear()
          next('/')
        })
    } else next('/')
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

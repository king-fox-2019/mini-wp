<template>
  <div>
    <Navbar @set-logout="setLogout" @switch-page="setPage"></Navbar>
    <div class="columns" style="margin: 30px 0px 0px 10px">
      <div class="column is-one-third">
        <Sidebar @switch-page="setPage" @change-theme="setTheme"></Sidebar>
      </div>
      <div class="column">
        <ContentPage v-if="this.page == 'public'" @switch-page="setPage"></ContentPage>
        <WriteArticlePage v-if="this.page == 'writeArticle'" @switch-page="setPage"></WriteArticlePage>
        <UserPage v-if="this.page == 'private'" @switch-page="setPage" @update-article="setUpdateArticleData"></UserPage>
        <UpdateArticlePage v-if="this.page == 'update'" :UpdateArticleData="articleGonnaBeUpdated" @switch-page="setPage"></UpdateArticlePage>
      </div>
    </div>
  </div>
  
</template>

<script>
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ContentPage from "../components/ContentPage"
import WriteArticlePage from '../components/WriteArticlePage'
import UserPage from "../components/UserPage"
import UpdateArticlePage from "../components/UpdateArticlePage"

export default {
  name: "Homepage",
  components: {
    Navbar,
    Sidebar,
    ContentPage,
    WriteArticlePage,
    UserPage,
    UpdateArticlePage
  },
  data () {
    return {
      page: 'public',
      articleGonnaBeUpdated: {}
    }
  },
  methods: {
    setLogout() {
      this.$emit('set-logout')
    },
    setPage(page) {
      this.page = page
    },
    setUpdateArticleData(articleData) {
      this.articleGonnaBeUpdated = articleData
    },
    setTheme(dark, light) {
      this.$emit('change-theme', dark, light)
    }
  }

}
</script>

<style scoped>
.is-two-fifths {
  display: flex;
  flex-direction: row;
}
</style>
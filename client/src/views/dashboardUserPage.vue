<template>
  <div class="d-flex bd-highlight">
    <navbar
      @page="changePage"
      @isLogin="isLogin"
      :activePage="activePage"
    ></navbar>
    <div class="p-2 flex-grow-1 bd-highlight" id="dashboard-title">
      <headerTitle v-if="activePage !== 'read-more-article-page'"></headerTitle>
      <readAllArticlePage
        @readMore="readMore"
        v-if="activePage == 'read-all-article-page'"
      ></readAllArticlePage>
      <draftArticlePage
        v-else-if="activePage == 'draft-article-page'"
      ></draftArticlePage>
      <createArticlePage
        @created="success"
        v-else-if="activePage == 'create-article-page'"
      ></createArticlePage>
      <readArticlePage
        @edited="edited"
        @readMore="readMore"
        v-else-if="activePage == 'read-article-page'"
      ></readArticlePage>
      <readMorePage
        @edited="edited"
        @deleted="deleted"
        v-else-if="activePage == 'read-more-article-page'"
        :article="article"
      ></readMorePage>
      <editedArticlePage
        @edited="success"
        v-else
        :article="articleData"
      ></editedArticlePage>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import headerTitle from "../components/header";
import createArticlePage from "./createArticlePage";
import draftArticlePage from "./draftArticlePage";
import readAllArticlePage from "./readAllArticlePage";
import readArticlePage from "./readArticlePage";
import readMorePage from "./readMorePage";
import editedArticlePage from "./editedArticlePage";

export default {
  components: {
    navbar,
    headerTitle,
    createArticlePage,
    draftArticlePage,
    readAllArticlePage,
    readArticlePage,
    readMorePage,
    editedArticlePage
  },
  // props: ["articleData"],
  data() {
    return {
      activePage: "read-all-article-page",
      articleData: null
    };
  },
  methods: {
    changePage(isPage) {
      this.activePage = isPage;
    },
    isLogin(val) {
      this.$emit("isLogin", val);
    },
    success() {
      this.activePage = "read-all-article-page";
    },
    readMore(val) {
      this.article = val;
      this.activePage = "read-more-article-page";
    },
    deleted() {
      this.activePage = "read-article-page";
    },
    edited(val) {
      this.articleData = val;
      this.activePage = "edited-article-page";
    }
  }
};
</script>

<style scoped>
#dashboard-title {
  background-color: #f9f9f9;
}
.p-2 {
  padding: 0px !important;
}
</style>

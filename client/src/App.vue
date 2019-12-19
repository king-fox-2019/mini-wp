<template>
   <div class="d-flex flex-column">
      <Navbar v-bind:showing="showing" v-on:signOut="userSignOut()" v-on:updateSignPage="updateSignPage($event)">
      </Navbar>

      <SignInRegisterPage v-if="showing == 'sign'" v-bind:signPage="signPage" v-on:signIn="userSignIn()">
      </SignInRegisterPage>

      <div class="d-flex" v-if="showing == 'article'" v-cloak>
         <LeftSideBar v-on:updatePage="changePage($event)" v-on:updateArticle="toUpdateArticlePage($event)" v-bind:articleId="articleId" v-bind:page="page">
         </LeftSideBar>
         <ArticleWrite v-if="page == 'articleWrite'" v-on:updatePage="changePage($event)">
         </ArticleWrite>
         <ArticleList v-if="page == 'articleList'" v-on:readDetail="openArticleDetail($event)"></ArticleList>
         <ArticleDetail v-if="page == 'articleDetail'" v-bind:article="article"></ArticleDetail>
         <ArticleEdit v-if="page == 'articleEdit'" v-on:readDetail="openArticleDetail($event)" v-bind:articleId="articleId"></ArticleEdit>
      </div>
   </div>
</template>

<script>
   import axios from '../apis/server'

   import Navbar from './layouts/navbar'
   import SignInRegisterPage from './layouts/signInRegisterPage'
   import LeftSideBar from './layouts/leftNavbar'
   import ArticleWrite from './layouts/articleWrite'
   import ArticleList from './layouts/articleList'
   import ArticleDetail from './layouts/articleDetail'
   import ArticleEdit from './layouts/articleEdit'

   export default {
      name: 'app',
      components: {
         Navbar,
         SignInRegisterPage,
         LeftSideBar,
         ArticleWrite,
         ArticleList,
         ArticleDetail,
         ArticleEdit
      },
      data() {
         return {
            isLoggedIn: false,
            signPage: 'signin',
            page: 'articleWrite',
            showing: 'sign',
            articleId: '',
            article: {}
         }
      },

      methods: {
         backToHome() {
            if (this.isLoggedIn) this.page = 'articleList'
         },

         userSignIn() {
            this.showing = 'article'
            this.page = 'articleList'
         },

         userSignOut() {
            this.showing = 'sign'
            this.signPage = 'signin'
         },

         updateSignPage(signTabName) {
            this.signPage = signTabName
         },

         changePage(pageName) {
            this.page = pageName
         },

         openArticleDetail(articleId) {
            axios({
               url: `/article/${articleId}`,
               method: 'get',
               headers: {
                  access_token: localStorage.getItem('access_token')
               }
            })
            .then(({data}) => {
               this.article = data.article
               this.articleId = articleId
               this.page = 'articleDetail'
            })
            .catch(error => console.log(error))
         },

         toUpdateArticlePage(articleId) {
            this.articleId = articleId
            this.page = 'articleEdit'
         },

         loginCheck() {
            if (localStorage.getItem('access_token') !== null) {
               this.userSignIn()
            }
         }
      },
      created() {
         this.loginCheck()
      }
   }
</script>

<style>
   [v-cloak] {
      display: none;
   }
</style>
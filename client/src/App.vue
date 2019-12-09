<template>
   <div class="d-flex flex-column">
      <Navbar v-bind:showing="showing" v-on:signOut="userSignOut()" v-on:updateSignPage="updateSignPage($event)">
      </Navbar>

      <SignInRegisterPage v-if="showing == 'sign'" v-bind:signPage="signPage" v-on:signIn="userSignIn()">
      </SignInRegisterPage>

      <div class="d-flex" v-if="showing == 'article'" v-cloak>
         <LeftSideBar v-on:changePage="changePage($event)">
         </LeftSideBar>
         <ArticleWrite v-on:changePage="changePage($event)">
         </ArticleWrite>
      </div>
   </div>
</template>

<script>
   import Navbar from './layouts/navbar'
   import SignInRegisterPage from './layouts/signInRegisterPage'
   import LeftSideBar from './layouts/leftNavbar'
   import ArticleWrite from './layouts/articleWrite'

   export default {
      name: 'app',
      components: {
         Navbar,
         SignInRegisterPage,
         LeftSideBar,
         ArticleWrite
      },
      data() {
         return {
            isLoggedIn: false,
            signPage: 'signin',
            page: 'articleWrite',
            showing: 'sign'
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
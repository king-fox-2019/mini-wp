import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateArticle from './views/CreateArticle.vue'
import Article from './views/Article.vue'
import MyArticle from './views/MyArticle.vue'
import EditArticle from './views/EditArticle.vue'
import Draft from './views/Draft.vue'
import Bookmark from './views/Bookmark.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addarticle',
      name: 'createArticle',
      component: CreateArticle
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      component: MyArticle
    },
    {
      path: '/draft',
      name: 'draft',
      component: Draft
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: Bookmark
    },
    {
      path: '/edit/:articleId',
      name: 'editArticle',
      component: EditArticle,
      props: true
    },
    {
      path: '/:slug',
      name: 'article',
      component: Article
    }
  ]


})
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/add-article',
    name: 'add-article',
    component: () => import('../views/AddArticle.vue')
  },
  {
    path: '/detail-article/:id',
    name: 'detail-article',
    component: () => import('../views/DetailArticle.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

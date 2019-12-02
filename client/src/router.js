import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/views/Landing.vue')
  },
  {
    path: '/signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue')
  },
  {
    path: '/profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

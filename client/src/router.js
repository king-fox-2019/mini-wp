import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/landing',
      component: () =>
        import(/* webpackChunkName: "landing" */ './pages/Landing.vue')
    },
    {
      path: '/profile',
      component: () =>
        import(/* webpackChunkName: "profile" */ './pages/Profile.vue')
    }
  ]
})

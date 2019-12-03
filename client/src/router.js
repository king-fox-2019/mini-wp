import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/views/Landing.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () =>
      import(/* webpackChunkName: "signin" */ '@/views/SignIn.vue')
  },
  {
    path: '/dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'articles',
        component: () =>
          import(
            /* webpackChunkName: "articles" */ '@/components/dashboard/Articles.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path == from.path) return next()
//   const toOuterPage =
//     to.name == 'landing' || to.name == 'signup' || to.name == 'signin'
//   checkSession()
//     .then(() => {
//       if (toOuterPage) next('/')
//       else next()
//     })
//     .catch(() => {
//       if (toOuterPage) next()
//       else next('/signup')
//     })
// })

export default router

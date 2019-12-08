import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Swal from 'sweetalert2'

import Login from './views/Login'
import Home from './views/Home'
import Editor from './views/Editor'
import Trash from './views/Trash'

Vue.use(VueRouter)

const routes = [
  { path: '/', 
    component: Home, 
    name: 'home' 
  },{ 
    path: '/login', 
    component: Login,
    name: 'login'
  },{ 
    path: '/editor', 
    component: Editor,
    name: 'editor',
    props: true
  },{
    path: '/trash',
    component: Trash,
    name: 'trash'
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('jwt_token')) next('/login')
//   else next()
// })

Vue.mixin({
  methods: {
    swal (status, msg) {
      if (status == 'error') {
        msg = msg.responseText || 'Something went wrong!';
      }
      
      Swal.fire(
        msg,
        '',
        status
      )
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
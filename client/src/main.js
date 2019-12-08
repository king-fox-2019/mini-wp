import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import Toasted from 'vue-toasted'

import '@/assets/scss/main.scss'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Loading, {
  color: '#9e2b25',
  'background-color': '#fff8f0'
})
Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 2000,
  className: 'bg-info text-dark font-weight-bold',
  containerClass: 'rounded'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

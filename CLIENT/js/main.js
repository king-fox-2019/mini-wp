import Vue from 'vue'
import App from '../src/App.vue'
import Buefy from 'buefy'
import wysiwyg from 'vue-wysiwyg'

import 'buefy/dist/toast.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(Buefy)
Vue.use(wysiwyg, {})

new Vue({
  render: h => h(App)
}).$mount('#app')
  
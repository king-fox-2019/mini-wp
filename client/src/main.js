import Vue from 'vue'
import wysiwyg from 'vue-wysiwyg'
import App from './App.vue'

import "vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(wysiwyg, {
  maxHeight: '68vh',
  hideModules: {
    "table": true,
    "removeFormat": true,
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

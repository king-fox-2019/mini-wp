import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import wysiwyg from "vue-wysiwyg";

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {
   maxHeight: "382px"
})

const app = new Vue({
   render : h => h(App)
}).$mount('#app')
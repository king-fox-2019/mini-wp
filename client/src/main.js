'use strict'

import Vue from 'vue'
import App from './app.vue'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";
import { LoaderPlugin } from 'vue-google-login'
import GSignInButton from 'vue-google-signin-button'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(wysiwyg, {
  hideModules: { "image": true },
});
Vue.use(LoaderPlugin)
Vue.use(GSignInButton)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
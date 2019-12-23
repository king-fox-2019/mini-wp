import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import GSignInButton from 'vue-google-signin-button'
import 'semantic-ui-css/semantic.min.css';
import router from './router'
import wysiwyg from 'vue-wysiwyg'
import '../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'

import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router';

import Toastr from 'vue-semantic-ui-toastr'
import VoerroTagsInput from '@voerro/vue-tagsinput';
import Paginate from 'vuejs-paginate'

Vue.component('tags-input', VoerroTagsInput);
Vue.component('paginate', Paginate)

Vue.use(wysiwyg, {})
// Vue.use(Buefy)

Vue.use(SuiVue)

Vue.use(wysiwyg, {})

Vue.use(GSignInButton)

Vue.use(Toastr, {
  duration: 3000,
  container: '.toastr-container',
  autoshow: true,
  html: false,
  position: 'right top'
})

new Vue({
  router,
  render : h => h(App),
}).$mount('#app')




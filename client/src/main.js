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

Vue.use(wysiwyg, {})
// Vue.use(Buefy)

Vue.use(SuiVue)

Vue.use(wysiwyg, {})

Vue.use(GSignInButton)


new Vue({
  router,
  render : h => h(App),
}).$mount('#app')




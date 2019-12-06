import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import wysiwyg from 'vue-wysiwyg'
import GSignInButton from 'vue-google-signin-button'
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue)

Vue.use(wysiwyg, {})

Vue.use(GSignInButton)

new Vue({
  render : h => h(App),
}).$mount('#app')




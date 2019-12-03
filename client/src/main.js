import Vue from 'vue'
import App from './App.vue'
import wysiwyg from 'vue-wysiwyg'
import GSignInButton from 'vue-google-signin-button'

Vue.use(wysiwyg, {})

Vue.use(GSignInButton)

new Vue({
  render : h => h(App),
}).$mount('#app')




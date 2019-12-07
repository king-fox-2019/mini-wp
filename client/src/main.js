import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { LoaderPlugin } from 'vue-google-login'
import GSignInButton from 'vue-google-signin-button'
import VueQuill from 'vue-quill'

Vue.use(Buefy)
Vue.use(LoaderPlugin, {
  client_id: "236286067260-r6fhp5u4cjekbhqtg5pnlq8e2s329lq8.apps.googleusercontent.com"
});
Vue.use(GSignInButton)
Vue.use(VueQuill)

new Vue({
  render: h => h(App),
}).$mount('#app')

import Buefy from 'buefy';
import "buefy/dist/buefy.css";
import "bulma/css/bulma.css"
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueQuill from 'vue-quill'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(VueQuill)
Vue.use(Buefy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app');



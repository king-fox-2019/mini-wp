
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


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: 'post',
        url: 'http://localhost:3000/users/googleLogin',
        data: {
          id_token : id_token
        }
      })
      .then(token => {

        localStorage.setItem('token',token.data)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token')
    });
  }
import Vue from 'vue';
import Swal from 'sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";
import GAuth from 'vue-google-oauth2'
import GSignInButton from 'vue-google-signin-button'
import lineClamp from 'vue-line-clamp'

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)

Vue.use(wysiwyg, {
    hideModules: { "table": true, "image": true },
    maxHeight: "500px",
    forcePlainTextOnPaste: false
});
Vue.use(BootstrapVue)
Vue.use(lineClamp, {

})


new Vue(App).$mount('#app');

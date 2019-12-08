
import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'

import wysiwyg from "vue-wysiwyg";
import VueQuill from 'vue-quill'

Vue.use(require('vue-moment'));
Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(VueQuill)
Vue.use(LoaderPlugin, { client_id: '487893327742-9nlhan5kbksp9vn9mqi11bn1saoe7mha.apps.googleusercontent.com' });
Vue.use(GSignInButton)
Vue.use(BootstrapVue)

new Vue({
    render : h => h(App)
}).$mount('#app')
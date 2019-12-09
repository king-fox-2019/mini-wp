import Vue from 'vue';
import App from './App.vue';
import SuiVue from "semantic-ui-vue";
import GSignInButton from 'vue-google-signin-button';
import VueQuill from 'vue-quill'

Vue.use(SuiVue);
Vue.use(GSignInButton);
Vue.use(VueQuill);

new Vue({
    render: h => h(App),
}).$mount('#app');
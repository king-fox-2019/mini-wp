import Vue from 'vue';
import App from './App.vue';
import SuiVue from "semantic-ui-vue";
import GSignInButton from 'vue-google-signin-button';
import VueQuill from 'vue-quill';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
    // clientId: '1077663190419-heca6gdre9f5031fdtd57m2uts9u64jj.apps.googleusercontent.com' //prodServer
    clientId: '1077663190419-fkbutpat7sloejjac79gs8tnfa1bmi3k.apps.googleusercontent.com' //localhost:1234
};

Vue.use(GAuth, gauthOption);
Vue.use(SuiVue);
Vue.use(GSignInButton);
Vue.use(VueQuill);

new Vue({
    render: h => h(App),
}).$mount('#app');
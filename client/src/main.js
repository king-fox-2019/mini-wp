import Vue from 'vue';
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {}); // config is optional. more below

new Vue({
    render: h => h(App),
}).$mount('#app');
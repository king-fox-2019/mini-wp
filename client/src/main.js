import Vue from 'vue';
import App from './App.vue'
// import axios from 'axios';
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.use(BootstrapVue)
// Vue.use(axios)
Vue.use(wysiwyg, {})




new Vue({
    render: h=>h(App),
}).$mount('#app')
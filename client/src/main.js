import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {})
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App)
}).$mount('#app')
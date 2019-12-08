import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    background: '#9900FF',
    showConfirmButton: false,
    timer: 2000,
    position: 'bottom-start'
};

Vue.use(VueSweetalert2, options)
Vue.use(Buefy, {
    // defaultIconPack: 'fas',
    defaultContainerElement: '#content'
})

Vue.prototype.$baseUrl = `http://localhost:3000`
new Vue({
    render: h => h(App),
}).$mount('#app')
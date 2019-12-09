import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(wysiwyg, {
    maxHeight: "500px",
    forcePlainTextOnPaste: true,
    image: {
        uploadURL: "http://localhost:3000/image/upload"
      }
    }
)

Vue.use(BootstrapVue)

new Vue({
    render: h => h(App)
}).$mount('#app')
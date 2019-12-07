import Vue from 'vue'
import App from './App.vue'
import wysiwyg from "vue-wysiwyg"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import "vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(wysiwyg, { 
    maxHeight: "500px",
    forcePlainTextOnPaste: true,
    image: {
        uploadURL: "http://localhost:3000/image/upload"
      }
    }
);

Vue.use(Buefy)

new Vue({
    render: h => h(App),
}).$mount('#app');
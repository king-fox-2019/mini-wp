import Vue from 'vue'
import App from './App.vue'
import wysiwyg from "vue-wysiwyg"
import "vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(wysiwyg, { 
    maxHeight: "500px",
    forcePlainTextOnPaste: true,
    image: {
        uploadURL: "",
        dropzoneOptions: {}
      }
    }
);

new Vue({
    render: h => h(App),
}).$mount('#app');
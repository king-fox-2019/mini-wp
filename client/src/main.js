import Vue from "vue";
import App from "./App.vue";
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {
  maxHeight: "130px",
  forcePlainTextOnPaste: true,
  image: {
    uploadURL: "http://localhost:3000/articles/image"
  }
});
import "vue-wysiwyg/dist/vueWysiwyg.css";

new Vue({
  render: h => h(App)
}).$mount("#app");

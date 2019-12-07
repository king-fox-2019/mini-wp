import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "../api/axios";
import VueAxios from "vue-axios";

Vue.use(Vuetify);
Vue.use(VueAxios, axios);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

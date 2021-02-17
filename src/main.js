import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/index";
import axios from "axios";

import '@/assets/css/main.css';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://backend.test/v1';
Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");

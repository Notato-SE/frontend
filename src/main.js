import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import Notifications from "vue-notification";

import "@/assets/css/main.css";

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://backend.test/v1";
Vue.prototype.$http = axios;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Notifications);

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "login"
    ) {
      originalRequest._retry = true;
      store.dispatch("logout");
      router.push(`/?login=1&t=${Date.now()}`);
    }
    return Promise.reject(error);
  }
});

Vue.config.productionTip = false;
new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");

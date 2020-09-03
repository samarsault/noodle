import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
// import 'vue-material-design-icons/styles.css'
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (
        error.response.data.error === "PHONEID" &&
        window.location.pathname !== "/details"
      ) {
        window.location.href = "/details";
      }
      // console.log(error);
    } else {
      return Promise.reject(error);
    }
  }
);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

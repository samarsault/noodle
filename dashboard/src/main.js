import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
// import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false;

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.data && error.response.data.location) {
			window.location.href = error.response.data.location;
		} else {
			return Promise.reject(error);
		}
	}
);

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');

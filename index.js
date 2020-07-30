import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
import StorageInit from "./utils/storageInit.js";

import "./libs/flexible.min";
import "flex.css";
import "./index.scss";

import routes from "./src/route";
import toTime from "./filter/toTime";
import toYuan from "./filter/toYuan";

import App from "./src/App.vue";
try {
	toTime(Vue);
	toYuan(Vue);
    StorageInit();
    
	Vue.use(VueRouter);

	const router = new VueRouter({
		routes
	});
	new Vue({
		components: { App },
		router: router
	}).$mount("#app");
} catch (err) {
	alert(err.toString());
}

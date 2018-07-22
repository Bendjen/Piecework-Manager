import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router";

import routes from "./src/route.js"
console.log(routes)

Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

const app = new Vue({
	el: '#app',
	router: router,
})

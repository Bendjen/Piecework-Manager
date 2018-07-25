import Vue from 'vue/dist/vue.js';
import VueRouter from "vue-router";

import 'flex.css';
import './index.scss'

import routes from "./src/route";
import toTime from "./filter/toTime";

import App from "./src/App.vue"

toTime(Vue);
Vue.use(VueRouter);


const router = new VueRouter({
    routes
});

const app = new Vue({
    components: { App },
    router: router,
}).$mount("#app")

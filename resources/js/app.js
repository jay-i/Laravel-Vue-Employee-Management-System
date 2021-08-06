require('./bootstrap');

window.Vue = require('vue').default;
import VueRouter from 'vue-router';
import { routes } from './routes'

Vue.use(VueRouter);


Vue.component('employees-index',
    require('./components/employees/Index.vue').default);


const router = new VueRouter({
    mode: "history",
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router
});
import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue'
import Diplo from './views/Diplo.vue';
import NotFound from './views/errors/404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Diplo
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ]
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies';

import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

import {rush, login, getIdList, getSongList, doRush} from "./utils/api";


Vue.prototype.rush = rush;
Vue.prototype.login = login;
Vue.prototype.getIdList = getIdList;
Vue.prototype.getSongList = getSongList;
Vue.prototype.doRush = doRush;
Vue.prototype.usedListId = [];

Vue.use(ElementUI);
Vue.use(VueCookies);
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

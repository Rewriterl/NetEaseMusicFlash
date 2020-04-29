import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})

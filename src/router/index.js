import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login';
//import Register from '../components/auth/Register';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../components/auth/Register')
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../components/catalogue/Catalogue')
  }

]

const router = new VueRouter({
  routes
})



export default router

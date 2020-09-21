import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login';

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
    component: () => import(/* webpackChunkName: "register" */ '../components/auth/Register')
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: () => import(/* webpackChunkName: "catalogue" */ '../components/catalogue/Catalogue'),
    //protected routes
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/coursePage/:id',
    name: 'CoursePage',
    component: () => import(/* webpackChunkName: "coursePage" */ '../components/CoursePage/CoursePage'),
    //protected routes
    meta: { 
      requiresAuth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})



export default router

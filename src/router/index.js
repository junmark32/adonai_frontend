import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import index from '../views/index.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'

//doctor
import Doctor_Dashboard from '../views/doctor/DashboardView.vue'
//admin
import Admin_Dashboard from '../views/admin/DashboardView.vue'
//user
import User_Ecom from '../views/user/EcomView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: index
  },

  {
    path: '/Register',
    name: 'register',
    component: Register
  },

  {
    path: '/Login',
    name: 'login',
    component: Login
  },

  //doctor

  {
    path: '/Doctor/Dashboard',
    name: 'Doctor_Dashboard',
    component: Doctor_Dashboard
  },

  //admin

  {
    path: '/Admin/Dashboard',
    name: 'Admin_Dashboard',
    component: Admin_Dashboard
  },

  //user

  
  {
    path: '/User/Ecommerce',
    name: 'User_Ecom',
    component: User_Ecom
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

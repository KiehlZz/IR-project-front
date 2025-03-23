import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  // Add more routes here when you build features like login, bookmarks, etc.
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

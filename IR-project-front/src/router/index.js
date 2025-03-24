import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import FolderView from '@/views/FolderView.vue'

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
  {
    path: '/folders',
    name: 'Folders',
    component: FolderView,
  },
  {
    path: '/folders/:id/:name',
    name: 'BookmarkView',
    component: () => import('@/views/BookmarkView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/folders/:id/:name',
    name: 'FolderDetail',
    component: () => import('@/views/BookmarkView.vue'),
    meta: { requiresAuth: true }
  }
  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
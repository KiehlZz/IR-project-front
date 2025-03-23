import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchView
  },
  // Add more routes here when you build features like login, bookmarks, etc.
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

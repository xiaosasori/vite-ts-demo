import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'NewPost',
      path: '/posts/new',
      component: () => import('./views/NewPost.vue')
    }
  ]
})

import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import {store} from './views/store'

  const routes = [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'ShowPost',
      path: '/posts/:id',
      component: () => import('./views/ShowPost.vue')
    },
    {
      name: 'NewPost',
      path: '/posts/new',
      component: () => import('./views/NewPost.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'EditPost',
      path: '/posts/:id/edit',
      component: () => import('./views/EditPost.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export const makeRouter = () => createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})
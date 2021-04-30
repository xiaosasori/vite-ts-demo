import { createApp } from 'vue'
import axios from 'axios'
import {router} from './router'
import App from './App.vue'
import * as mockData from './views/mocks'
import 'highlight.js/styles/solarized-dark.css'
import {Post, User} from './types'
import random from 'lodash/random'

const delay = (ms: number) => new Promise(resovle => setTimeout(resovle, ms))

// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay(1000)
    return Promise.resolve({
      data: [mockData.thisWeek, mockData.todayPost, mockData.thisMonth]
    })
  }
}

// @ts-ignore
axios.put = async (url: string, payload: Post) => {
  if (url === '/posts') {
    await delay(500)
    return Promise.resolve({
      data: payload
    })
  }
}

// @ts-ignore
axios.post = async (url: string, payload: Post | User) => {
  if (url === '/posts') {
    await delay(500)
    const id = random(100, 1000)
    return Promise.resolve({
      data: {...payload, id}
    })
  }

  if (url === '/users') {
    await delay(500)
    const id = random(100, 10000)
    const { id: oldId, password, ...rest } = payload as User
    return Promise.resolve({
      data: {id, ...rest}
    })
  }
}
createApp(App).use(router).mount('#app')

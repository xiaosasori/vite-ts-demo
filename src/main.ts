import { createApp } from 'vue'
import axios from 'axios'
import {router} from './router'
import App from './App.vue'
import * as mockData from './views/mocks'
import 'highlight.js/styles/solarized-dark.css'
import {Post} from './types'
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
axios.post = async (url: string, payload: Post) => {
  if (url === '/posts') {
    await delay(500)
    const id = random(100, 1000)
    return Promise.resolve({
      data: {...payload, id}
    })
  }
}
createApp(App).use(router).mount('#app')

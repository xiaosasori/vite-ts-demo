import { createApp } from 'vue'
import axios from 'axios'
import {router} from './router'
import App from './App.vue'
import * as mockData from './views/mocks'

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
createApp(App).use(router).mount('#app')

import axios from 'axios'
import {reactive, readonly} from 'vue'
import {Post} from '../types'

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

import { todayPost, thisWeek, thisMonth } from './mocks'


const initialPostsState = (): PostsState => ({
  all: {
  },
  ids: [],
  loaded: false
})

const initalState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState() {
    return readonly(this.state)
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    const ids: string[] = []
    const all: Record<string, Post> = {}
    for (const post of response.data) {
      ids.push(post.id.toString())
      all[post.id] = post // number as a key for js obj implicitly convert to string
    }
    this.state.posts = {
      ids, all, loaded: true
    }
  }
}

const store = new Store(initalState())
store.getState()

export const useStore = () => store
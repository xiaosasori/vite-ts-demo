<template>
  <PostWriter :post="post" @save="save" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
import PostWriter from './PostWriter.vue'
import { Post } from '@/types'
import { useStore } from './store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NewPost',
  components: { PostWriter },
  setup () {
    const store = useStore()
    const router = useRouter()

    const post: Post = {
      id: -1,
      title: 'New Post',
      markdown: '## New Post\nEnter your post here...',
      html: '',
      created: moment(),
      authorId: parseInt(store.getState().authors.currentUserId, 10)
    }

    const save = async (post: Post) => {
      await store.createPost(post)
      router.push('/')
    }

    return { post, save }
  }
})
</script>

<style>

</style>

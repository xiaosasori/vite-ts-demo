<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="showModal">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="visible">
      <Signup />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'

export default defineComponent({
  components: { Signup },
  setup () {
    const { visible, showModal } = useModal()
    return { visible, showModal }
  }
})
</script>

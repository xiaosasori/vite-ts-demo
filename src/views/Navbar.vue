<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button">Signout</button>
      </div>
      <div class="buttons" v-if="!auth">
        <button class="button" @click="signup">Signup</button>
        <button class="button" @click="signin">Signin</button>
      </div>
    </div>
    <teleport to="#modal" v-if="visible">
      <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, markRaw } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'
import { useStore } from './store'

export default defineComponent({
  components: { Signup },
  setup () {
    const store = useStore()
    const auth = computed(() => store.getState().authors.currentUserId)
    const { visible, showModal, component } = useModal()
    const signin = () => {
      showModal()
    }
    const signup = () => {
      component.value = markRaw(Signup)
      showModal()
    }

    return { visible, showModal, signin, signup, auth, component }
  }
})
</script>

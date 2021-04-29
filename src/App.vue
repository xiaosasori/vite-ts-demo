<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button @click="hideModal" class="modal-close is-large" aria-label="close"></button>
  </div>

  <section class="section">
    <div class="container">
      <Navbar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Navbar from './views/Navbar.vue'
import { useModal } from './views/useModal'
import { provideStore } from './views/store'

export default defineComponent({
  name: 'App',
  components: { Navbar },
  setup () {
    provideStore()
    const { visible, hideModal } = useModal()

    const style = computed(() => ({
      display: visible.value ? 'block' : 'none'
    }))

    return { style, hideModal }
  }
})
</script>

<style>

</style>

<template>
  <div class="section">
    <div class="container">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './views/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: { Navbar }
})
</script>

<style>

</style>

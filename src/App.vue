<template>
  <div class="section">
    <div class="container">
      <Timeline/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from './views/Timeline.vue'

export default defineComponent({
  name: 'App',
  components: {
    Timeline
  }
})
</script>

<style>

</style>

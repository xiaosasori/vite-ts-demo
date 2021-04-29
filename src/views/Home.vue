<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <Timeline/>
        </template>
        <template #fallback>
          <div class="columns">
            <div class="column is-one-third"></div>
            <div class="column is-one-third">
              <Progress />
            </div>
            <div class="column is-one-third"></div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from './Timeline.vue'
import Progress from './Progress.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Timeline,
    Progress
  }
})
</script>

<style>

</style>

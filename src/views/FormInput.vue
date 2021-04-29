<template>
  <div class="field">
    <label for="name" class="label">{{name}}</label>
    <div class="control">
      <input class="input" :id="name" @input="handleInput" :value="modelValue" :type="type">
    </div>
    <p class="help is-danger" v-if="error">{{error}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    error: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      requried: true
    }
  },
  emits: ['update:modelValue'],
  setup (_, { emit }) {
    const handleInput = (event: any) => {
      emit('update:modelValue', event.target.value)
    }

    return { handleInput }
  }
})
</script>

<style>

</style>

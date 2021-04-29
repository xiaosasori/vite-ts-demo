<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input
              type="text"
              v-model="title"
              class="input"
              data-test="post-title"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-half">
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
          data-test="markdown"
        ></div>
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <button
          @click="submit"
          class="button is-primary is-pulled-right"
          data-test="submit-post"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import debounce from 'lodash/debounce'
import { parse, MarkedOptions } from 'marked'
import { highlightAuto } from 'highlight.js'
import { Post } from '@/types'

export default defineComponent({
  name: 'PostEditor',
  emits: ['save'],
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  setup (props, { emit }) {
    const title = ref(props.post.title)
    const contentEditable = ref<null | HTMLDivElement>(null)
    const markdown = ref(props.post.markdown)
    const html = ref('')

    const options: MarkedOptions = {
      highlight: (code: string) => {
        return highlightAuto(code).value
      }
    }
    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText
    }

    const submit = () => {
      const post: Post = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value
      }
      emit('save', post)
    }

    const update = (value: string) => {
      html.value = parse(value, options)
    }

    watch(markdown, debounce(update, 500), { immediate: true })

    onMounted(() => {
      contentEditable.value.innerText = markdown.value
    })
    return { title, contentEditable, handleEdit, markdown, html, submit }
  }
})
</script>

<style>
</style>

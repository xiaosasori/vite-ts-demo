<template>
  <form @submit.prevent="submit">
    <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message" />
    <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message" />
    <button class="button is-primary" :disabled="!usernameStatus.valid || !passwordStatus.valid">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { required, length, validate, Status } from './validators'
import FormInput from './FormInput.vue'
import { User } from '@/types'
import { useStore } from './store'
import { useModal } from './useModal'
export default defineComponent({
  name: 'Signup',
  components: { FormInput },
  setup () {
    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [required(), length({ min: 5, max: 10 })])
    })
    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [required(), length({ min: 6, max: 40 })])
    })
    const store = useStore()
    const { hideModal } = useModal()
    const submit = async () => {
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return
      }
      const user: User = {
        id: -1,
        username: username.value,
        password: password.value
      }
      store.createUser(user)
      hideModal()
    }
    return {
      submit,
      usernameStatus,
      username,
      password,
      passwordStatus
    }
  }
})
</script>

<style scoped>
form {
  background: white;
  padding: 15px;
}
</style>

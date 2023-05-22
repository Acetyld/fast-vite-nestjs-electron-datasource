<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Vite + Electron & Esbuild',
  },
})

const { getOrders, addOrder, ordersStream } = window.electron

const log = ref('')
const msg = ref('')
async function onClick() {
  console.log(await getOrders())
}

async function insertFakeOrder() {
  console.log(await addOrder())
}

ordersStream((msg: unknown) => {
  console.log(msg)
})
</script>

<template>
  <h1>{{ props.title }}</h1>

  <textarea v-model="log" cols="60" rows="10" disabled />
  <div style="margin-top: 20px">
    <input v-model="msg" type="text" placeholder="send msg to main process">
    <button style="margin-left: 20px" @click="onClick">
      Send
    </button>
    <button style="margin-left: 20px" @click="insertFakeOrder">
      Fake Order
    </button>
  </div>
</template>

<style>

</style>

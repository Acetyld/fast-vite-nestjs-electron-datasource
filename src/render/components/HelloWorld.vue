<script setup lang="ts">
import type { Order } from '@main/order/order.entity'

const props = defineProps({
  title: {
    type: String,
    default: 'Vite + Electron & Esbuild',
  },
})

const {
  addOrder,
  ordersStream,
} = window.electron

async function insertFakeOrder() {
  await addOrder()
}

ordersStream((order: Order) => {
  console.log('New order:', order)
})
</script>

<template>
  <button style="margin-left: 20px" @click="insertFakeOrder">
    Create new order
  </button>
</template>

<style>

</style>

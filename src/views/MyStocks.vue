<script setup lang="ts">
import { useStocksStore } from '@/stores/stocks'
import { onMounted } from 'vue'
const { initialize, myStocks } = useStocksStore()
onMounted(() => {
  try {
    initialize()
  } catch (error) {
    console.error('Error fetching stocks:', error)
  }
})
</script>
<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl">My Stocks</h1>
    <div class="border-2 p-2 bg-cyan-900 mt-6 text-lg">
      <ul>
        <li v-for="(stock, index) in myStocks" :key="index">
          <h3 class="flex gap-2">
            Ticker: <span class="text-green-500">{{ stock.name }}</span> Price:
            <span class="text-green-500">${{ stock.price }}</span>
            Qty:
            <span class="text-red-500">{{ stock.quantity }}</span> Bought:

            <span class="text-indigo-500">{{ stock.boughtAt }}</span> PST
          </h3>
        </li>
      </ul>
    </div>
  </div>
</template>

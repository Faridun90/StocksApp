<script setup lang="ts">
import { useStocksStore } from '@/stores/stocks'
import { onMounted } from 'vue'
const stocksStore = useStocksStore()
const myStocks = stocksStore.myStocks
onMounted(async () => {
  try {
    await initialize()
  } catch (error) {
    console.error('Error fetching stocks:', error)
  }
})
const initialize = async () => {
  stocksStore.initialize()
}
</script>
<template>
  <div class="text-white bg-black w-full h-screen">
    <h1 class="">My Stocks</h1>
    <h3 v-for="(stock, index) in myStocks" :key="index">{{ stock }}</h3>
  </div>
</template>

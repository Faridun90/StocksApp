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
  <div class="text-white bg-black w-full h-screen">
    <h1 class="">My Stocks</h1>

    <h3 v-for="(stock, index) in myStocks" :key="index">
      Ticker: === {{ stock.name }} Price: ${{ stock.price }}
    </h3>
  </div>
</template>

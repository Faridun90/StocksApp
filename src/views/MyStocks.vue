<script setup lang="ts">
import { useStocksStore } from '@/stores/stocks'
import { onMounted, ref } from 'vue'
// import { api } from '../utils/stockApi'
import { api2 } from '../utils/finnhubApi'

const { initialize, myStocks, getTodaysPrices } = useStocksStore()
const latestPrices = ref<Record<string, any>>({})

onMounted(async () => {
  initialize()
  getTodaysPrices()
  await updateLatestPrices()
})

const updateLatestPrices = async () => {
  for (const stock of myStocks) {
    try {
      const response = await api2.getStockNewPrice(stock.name)
      latestPrices.value[stock.name] = response.data.c
    } catch (error) {
      console.error('Error fetching latest price for', stock.name, ':', error)
    }
  }
}

const getLatestPrice = (stockName: string) => {
  return latestPrices.value[stockName]
}

console.log(getLatestPrice('AAPL'))
</script>
<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl mb-10">My Stocks</h1>
    <div>
      <a href="/stocks">
        <button class="border-2 rounded-md text-lg p-1 bg-green-400">Buy Stocks</button>
      </a>
    </div>
    <div class="border-2 p-2 bg-cyan-900 mt-6 text-lg">
      <ul>
        <li v-for="(stock, index) in myStocks" :key="index">
          <h3 class="flex gap-2">
            <h4>Ticker:</h4>
            <span class="text-green-500">{{ stock.name }}</span>
            <h4>Price:</h4>
            <span class="text-green-500">${{ stock.price }}</span>
            <h4>Current price:</h4>
            <span class="text-green-500">${{ getLatestPrice(stock.name) }}</span>
            <h4>Qty:</h4>
            <span class="text-red-500">{{ stock.quantity }}</span>
            <h4>Bought:</h4>
            <span class="text-indigo-500">{{ stock.boughtAt }}</span> PST
          </h3>
        </li>
      </ul>
    </div>
  </div>
</template>

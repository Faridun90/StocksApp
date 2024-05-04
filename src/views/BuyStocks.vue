<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../utils/stockApi'
import { type IAggsResults } from '@/models/polygonTypes'
import { useStocksStore } from '@/stores/stocks'

const userInput = ref('')
const response = ref<any[]>([])
const response2 = ref<IAggsResults | null>(null)
const stocksStore = useStocksStore()
const stockName = ref<string>('')
const stockPrice = ref<number>(0)
const stockQuantity = ref<number>(0)

onMounted(async () => {
  try {
    await initialize()
    response.value = await api.getStocks()
  } catch (error) {
    console.error('Error fetching stocks:', error)
  }
})
const initialize = async () => {
  stocksStore.initialize()
}
const fetchStock = async () => {
  try {
    response2.value = await api.getStock(userInput.value)
    if (response2.value.T && response2.value.c) {
      stockName.value = response2.value.T
      stockPrice.value = response2.value.c
    }

    console.log('Name', stockName.value, 'Price', stockPrice.value)
  } catch (error) {
    console.error('Error fetching stock data:', error)
  }
}

const handleSelectChange = (event: Event) => {
  userInput.value = (event.target as HTMLSelectElement).value
}

const buyStock = () => {
  const stockObj = {
    name: stockName.value,
    price: stockPrice.value,
    quantity: stockQuantity.value,
    boughtAt: new Date().toISOString()
  }
  if (stockObj && stockQuantity.value > 0) {
    stocksStore.buyStock(stockObj)
    console.log(new Date().toISOString())
  } else {
    console.log('No stock selected.')
  }
}
</script>

<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl">Buy stocks</h1>
    <div class="flex flex-col py-3 px-3 border-2 w-2/4">
      <select v-model="userInput" @change="handleSelectChange" class="text-black">
        <option
          v-for="(stock, index) in response"
          :key="index"
          :value="stock.ticker"
          class="text-black"
        >
          <span class="text-white">{{ stock.ticker }}</span>
        </option>
      </select>
    </div>
    <!-- <div class="flex flex-col py-3 px-3 border-2 w-2/4">
      <label for="searchStock"> Type the name of a Stock to search </label>
      <input type="text" id="searchStock" v-model="searchTerm" placeholder="Type here..." />
    </div> -->

    <form @submit.prevent="fetchStock" class="m-5 text-xl flex gap-2">
      <button type="submit" class="border-2 rounded-md text-lg p-1">Get Stock Data</button>
    </form>
    <div v-if="response2" class="flex flex-col gap-2 bg-gray-700 p-2 rounded-md border-2">
      <div class="text-yellow-300 text-2xl">
        Price for 1 <span class="text-green-400">"{{ userInput }}"</span> stock is :
        <span class="text-green-400">${{ response2.c }}</span>
      </div>
      <div class="flex gap-3">
        <span class="text-yellow-300 text-2xl">Quantity</span>
        <input type="number" class="text-black w-1/4" v-model="stockQuantity" />
      </div>

      <form @submit.prevent="buyStock()">
        <button type="submit" class="border-2 rounded-md text-lg p-1 w-1/3 bg-green-400">
          BUY
        </button>
      </form>
    </div>
  </div>
</template>

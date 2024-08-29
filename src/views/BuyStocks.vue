<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  await initialize()
  await fetchStockList()
})

const initialize = async () => {
  stocksStore.initialize()
}

const fetchStockList = async () => {
  try {
    loading.value = true
    response.value = await api.getStocks()
  } catch (err) {
    console.error('Error fetching stocks:', err)
    error.value = 'Error fetching stock list'
  } finally {
    loading.value = false
  }
}

const fetchStock = async () => {
  if (!userInput.value) {
    error.value = 'Please select a stock.'
    return
  }
  try {
    loading.value = true
    response2.value = await api.getStock(userInput.value)
    if (response2.value.T && response2.value.c) {
      stockName.value = response2.value.T
      stockPrice.value = response2.value.c
      error.value = null
    } else {
      error.value = 'Invalid stock data received'
    }
  } catch (err) {
    console.error('Error fetching stock data:', err)
    error.value = 'Error fetching stock data'
  } finally {
    loading.value = false
  }
}
//test

const handleSelectChange = (event: Event) => {
  userInput.value = (event.target as HTMLSelectElement).value
}

const buyStock = () => {
  if (!stockName.value || stockQuantity.value <= 0) {
    error.value = 'Please select a stock and enter a valid quantity.'
    return
  }

  const stockObj = {
    name: stockName.value,
    price: stockPrice.value,
    quantity: stockQuantity.value,
    boughtAt: new Date().toISOString()
  }

  stocksStore.buyStock(stockObj)
  console.log('Stock bought at:', new Date().toISOString())
  error.value = null
}

watch(
  () => stocksStore.myTransactions,
  (newStocks) => {
    if (newStocks.length > 0) {
      console.log('Updated stocks:', newStocks)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl mb-10">Buy Stocks</h1>
    <div>
      <a href="/my-portfolio">
        <button class="border-2 rounded-md text-lg p-1">My Portfolio</button>
      </a>
    </div>

    <div class="flex flex-col mt-6 py-3 px-3 border-2 w-2/4">
      <select v-model="userInput" @change="handleSelectChange" class="text-black">
        <option v-for="(stock, index) in response" :key="index" :value="stock.ticker">
          {{ stock.ticker }}
        </option>
      </select>
    </div>

    <form @submit.prevent="fetchStock" class="m-5 text-xl flex gap-2">
      <button type="submit" class="border-2 rounded-md text-lg p-1 bg-green-400">
        Get Stock Data
      </button>
    </form>

    <div v-if="loading" class="text-yellow-300">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="response2" class="flex flex-col gap-2 bg-gray-700 p-2 rounded-md border-2">
      <div class="text-yellow-300 text-2xl">
        Price for 1 <span class="text-green-400">"{{ userInput }}"</span> stock is :
        <span class="text-green-400">${{ response2.c }}</span>
      </div>
      <div class="flex gap-3">
        <span class="text-yellow-300 text-2xl">Quantity</span>
        <input type="number" class="text-black w-1/4" v-model="stockQuantity" min="1" />
      </div>

      <form @submit.prevent="buyStock">
        <button
          type="submit"
          class="border-2 rounded-md text-lg p-1 w-1/3 bg-green-400"
          :disabled="!stockName || stockQuantity <= 0"
        >
          BUY
        </button>
      </form>
    </div>
  </div>
</template>

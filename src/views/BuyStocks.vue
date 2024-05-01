<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../utils/stockApi'
import { type IAggsResults } from '@/models/polygonTypes'

const userInput = ref('')
const response = ref()
const response2 = ref({} as IAggsResults)

onMounted(async () => {
  try {
    response.value = await api.getStocks()
  } catch (error) {
    console.error(error)
  }
})

const fetchStock = async () => {
  response2.value = await api.getStock(userInput.value)
}

console.log(response2.value)
</script>

<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl">Buy stocks</h1>
    <div class="flex flex-col py-3 px-3 border-2 w-2/4">
      <h2 class="text-white" v-for="(ticker, index) in response" :key="index">
        <div>{{ index + 1 }} - {{ ticker.ticker }}</div>
      </h2>
    </div>

    <form @submit.prevent="fetchStock" class="m-5 text-xl flex gap-2">
      <input type="text" class="text-black" v-model="userInput" placeholder="Enter stock symbol" />
      <button type="submit" class="border-2 rounded-md text-lg p-1">Get Stock Data</button>
    </form>
    <h2 class="text-yellow-300 text-2xl">
      Price for 1 "{{ userInput }}" stock is : ${{ response2.c }}
    </h2>
  </div>
</template>

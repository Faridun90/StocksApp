<script setup lang="ts">
import { useStocksStore } from '@/stores/stocks'
import { onMounted, ref } from 'vue'
import type { stockProfitObjProps } from '@/models/stockProfitTypes'

const stocksStore = useStocksStore()
const { initialize, myStocks, marketPrices, getTodaysPrices } = stocksStore
const stockProfits = ref<stockProfitObjProps[]>([])
const profitSum = ref(0)

onMounted(async () => {
  initialize()
  getTodaysPrices()
  comparePrices()
})

const comparePrices = () => {
  console.log('Comparing prices...')
  console.log('marketPrices:', marketPrices)
  console.log('myStocks:', myStocks)

  const profits: stockProfitObjProps[] = myStocks
    .map((stock) => {
      const marketPrice = marketPrices.find((mp) => mp.name === stock.name)
      if (marketPrice) {
        const currentPrice = marketPrice.currentPrice ?? 0
        const profit = ((currentPrice - stock.price) * stock.quantity).toFixed(3)
        return {
          name: stock.name,
          boughtPrice: stock.price,
          currentPrice,
          quantity: stock.quantity,
          profit: parseFloat(profit)
        }
      }
      return null
    })
    .filter((profit) => profit !== null) as stockProfitObjProps[]

  stockProfits.value = profits
}

const overallProfit = () => {
  let sum = 0
  for (let i = 0; i < stockProfits.value.length; i++) {
    sum += stockProfits.value[i].profit
    sum = parseFloat(sum.toFixed(3))
  }
  return (profitSum.value = sum)
}
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
        <li v-for="(stock, index) in stockProfits" :key="index">
          <h3 class="flex gap-2">
            <h4>Ticker:</h4>
            <span class="text-green-500">{{ stock.name }}</span>

            <h4>Bought Price:</h4>
            <span class="text-green-500">${{ stock.boughtPrice }}</span>

            <h4>Current Price:</h4>
            <span class="text-green-500">${{ stock.currentPrice }}</span>

            <h4>Qty:</h4>
            <span class="text-red-500">{{ stock.quantity }}</span>

            <h4>Profit:</h4>
            <span :class="{ 'text-green-500': stock.profit >= 0, 'text-red-500': stock.profit < 0 }"
              >${{ stock.profit }}</span
            >
          </h3>
        </li>
      </ul>
    </div>
    <div class="border-2 p-2 bg-cyan-900 mt-6 text-lg">
      <h2>
        My Profit today is:
        <span :class="{ 'text-green-500': profitSum >= 0, 'text-red-500': profitSum < 0 }"
          >${{ overallProfit() }}</span
        >
      </h2>
    </div>
  </div>
</template>

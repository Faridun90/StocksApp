<script setup lang="ts">
import { useStocksStore } from '@/stores/stocks'
import { computed, onMounted, ref, watch } from 'vue'
import type { stockProfitObjProps } from '@/models/stockProfitTypes'
import type { stockObjProps } from '@/models/stockTypes'

const stocksStore = useStocksStore()
const { initialize, myTransactions, marketPrices, getTodaysPrices } = stocksStore
const stockProfits = ref<stockProfitObjProps[]>([])
const profitSum = ref(0)

// Function to merge stocks with the same name
function mergeStocks(stocks: stockObjProps[]): stockObjProps[] {
  return Object.values(
    stocks.reduce(
      (acc, stock) => {
        if (acc[stock.name]) {
          const existingStock = acc[stock.name]

          const totalQuantity = existingStock.quantity + stock.quantity

          existingStock.price =
            (existingStock.price * existingStock.quantity + stock.price * stock.quantity) /
            totalQuantity

          existingStock.quantity = totalQuantity
        } else {
          acc[stock.name] = { ...stock }
        }
        return acc
      },
      {} as { [key: string]: stockObjProps }
    )
  )
}

onMounted(async () => {
  initialize()
  await getTodaysPrices()
  comparePrices()
})

const comparePrices = () => {
  const mergedStocks = mergeStocks(myTransactions) // Merge stocks before comparing prices
  const profits: stockProfitObjProps[] = mergedStocks
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

const overallProfit = computed(() => {
  return stockProfits.value.reduce((sum, stock) => sum + stock.profit, 0).toFixed(3)
})

watch([myTransactions, marketPrices], () => {
  if (myTransactions.length && marketPrices.length) {
    comparePrices()
  }
})
</script>

<template>
  <div class="bg-black text-white flex flex-col py-10 mx-auto w-full h-screen items-center">
    <h1 class="text-4xl mb-10">My Portfolio</h1>
    <div>
      <a href="/">
        <button class="border-2 rounded-md text-lg p-1 bg-green-400">Buy Stocks</button>
      </a>
    </div>
    <div class="border-2 p-2 bg-cyan-900 mt-6 text-lg">
      <ul>
        <li v-for="(stock, index) in stockProfits" :key="index">
          <h3 class="flex gap-2">
            <h4>Ticker:</h4>
            <span class="text-green-500">{{ stock.name }}</span>

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
          >${{ overallProfit }}</span
        >
      </h2>
    </div>
    <div class="mt-8 text-xl">
      <h2>Transactions</h2>
      <div class="border-2 p-2 bg-cyan-900 mt-2 text-lg">
        <ul>
          <li v-for="(stock, index) in myTransactions" :key="index">
            <h3 class="flex gap-2">
              <h4>Ticker:</h4>
              <span class="text-green-500">{{ stock.name }}</span>
              <h4>Qty:</h4>
              <span class="text-red-500">{{ stock.quantity }}</span>
              <h4>Price:</h4>
              <span class="text-green-500">${{ stock.price }}</span>

              <h4>Date:</h4>
              <span class="text-green-500">{{ stock.boughtAt }}</span>
            </h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

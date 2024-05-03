import { defineStore } from 'pinia'
import type { stockObjProps } from '@/models/stockTypes'
export const useStocksStore = defineStore({
  id: 'stock',
  state: () => ({
    myStocks: [] as stockObjProps[]
  }),
  getters: {},
  actions: {
    buyStock(stock: stockObjProps) {
      this.myStocks.push(stock)
      localStorage.setItem('MyStocks', JSON.stringify(this.myStocks))
    },
    initialize() {
      const savedStocks = localStorage.getItem('MyStocks')
      if (savedStocks) {
        const parsedStocks = JSON.parse(savedStocks)
        for (let i = 0; i < parsedStocks.length; i++) {
          this.myStocks.push(parsedStocks[i])
        }
      }
    }
  }
})

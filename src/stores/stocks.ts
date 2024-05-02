import { defineStore } from 'pinia'
import type { IAggsResults } from '@/models/polygonTypes'

export const useStocksStore = defineStore({
  id: 'stock',
  state: () => ({
    myStocks: [] as IAggsResults[]
  }),
  actions: {
    buyStock(stock: IAggsResults) {
      this.myStocks.push(stock)
      localStorage.setItem('MyStocks', JSON.stringify(this.myStocks))
    },
    initialize() {
      const savedStocks = localStorage.getItem('MyStocks')
      if (savedStocks) {
        this.myStocks = JSON.parse(savedStocks)
      }
    }
  }
})

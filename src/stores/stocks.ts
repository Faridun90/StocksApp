import { defineStore } from 'pinia'
import type { stockObjProps } from '@/models/stockTypes'
import type { marketPriceObjProps } from '@/models/marketPriceTypes'
import { api2 } from '@/utils/finnhubApi'
// import { api2 } from '@/utils/finnhubApi'
export const useStocksStore = defineStore({
  id: 'stock',
  state: () => ({
    myStocks: [] as stockObjProps[],
    marketPrices: [] as marketPriceObjProps[]
  }),

  getters: {},
  actions: {
    buyStock(stock: stockObjProps) {
      this.myStocks.push(stock)
      localStorage.setItem('MyPortfolio', JSON.stringify(this.myStocks))
    },

    async getTodaysPrices() {
      for (let i = 0; i < this.myStocks.length; i++) {
        try {
          const response = await api2.getStockNewPrice(this.myStocks[i].name)
          const marketPriceObj = {
            name: this.myStocks[i].name,
            currentPrice: response.data.c,
            currentDate: new Date().toISOString()
          }
          this.marketPrices.push(marketPriceObj)
        } catch (error) {
          console.error('Error fetching latest price for', ':', error)
        }
      }
      console.log(this.marketPrices)
    },
    initialize() {
      const savedStocks = localStorage.getItem('MyPortfolio')
      if (savedStocks) {
        const parsedStocks = JSON.parse(savedStocks)
        for (let i = 0; i < parsedStocks.length; i++) {
          this.myStocks.push(parsedStocks[i])
        }
        console.log(this.myStocks)
      }
    }
  }
})

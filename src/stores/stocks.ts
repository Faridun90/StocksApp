import { defineStore } from 'pinia'
import type { stockObjProps } from '@/models/stockTypes'
import type { marketPriceObjProps } from '@/models/marketPriceTypes'
import { api2 } from '@/utils/finnhubApi'

export const useStocksStore = defineStore({
  id: 'stock',
  state: () => ({
    myStocks: [] as stockObjProps[],
    marketPrices: [] as marketPriceObjProps[]
  }),
  getters: {
    getStockByName: (state) => (name: string) => {
      return state.marketPrices.find((stock) => stock.name === name)
    }
  },
  actions: {
    buyStock(stock: stockObjProps) {
      this.myStocks.push(stock)
      localStorage.setItem('MyPortfolio', JSON.stringify(this.myStocks))
    },
    async getTodaysPrices() {
      const marketPrices: marketPriceObjProps[] = []
      for (const stock of this.myStocks) {
        try {
          const response = await api2.getStockNewPrice(stock.name)
          if (response && response.data && response.data.c !== undefined) {
            const marketPriceObj: marketPriceObjProps = {
              name: stock.name,
              currentPrice: response.data.c,
              currentDate: new Date().toISOString()
            }
            marketPrices.push(marketPriceObj)
          }
        } catch (error) {
          console.error('Error fetching latest price for', stock.name, ':', error)
        }
      }
      this.marketPrices = marketPrices
      localStorage.setItem('MarketPrices', JSON.stringify(this.marketPrices))
    },
    initialize() {
      const savedStocks = localStorage.getItem('MyPortfolio')
      if (savedStocks) {
        const parsedStocks = JSON.parse(savedStocks)
        for (let i = 0; i < parsedStocks.length; i++) {
          this.myStocks.push(parsedStocks[i])
        }
      }

      const savedMarketPrices = localStorage.getItem('MarketPrices')
      if (savedMarketPrices) {
        const parsedPrices = JSON.parse(savedMarketPrices)
        for (let i = 0; i < parsedPrices.length; i++) {
          this.marketPrices.push(parsedPrices[i])
        }
      }
    }
  }
})

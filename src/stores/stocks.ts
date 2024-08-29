import { defineStore } from 'pinia'
import type { stockObjProps } from '@/models/stockTypes'
import type { marketPriceObjProps } from '@/models/marketPriceTypes'
import { api2 } from '@/utils/finnhubApi'
import { format, toZonedTime } from 'date-fns-tz'

function getFormattedDate() {
  const zonedDate = toZonedTime(new Date(), 'America/Los_Angeles')
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss') + ' PST'
}

export const useStocksStore = defineStore({
  id: 'stock',
  state: () => ({
    myTransactions: [] as stockObjProps[],
    marketPrices: [] as marketPriceObjProps[]
  }),
  getters: {
    getStockByName: (state) => (name: string) => {
      return state.marketPrices.find((stock) => stock.name === name)
    }
  },
  actions: {
    buyStock(stock: stockObjProps) {
      stock.boughtAt = getFormattedDate()
      this.myTransactions.push(stock)
      localStorage.setItem('MyPortfolio', JSON.stringify(this.myTransactions))
    },
    async getTodaysPrices() {
      const marketPrices: marketPriceObjProps[] = []
      for (const stock of this.myTransactions) {
        try {
          const response = await api2.getStockNewPrice(stock.name)
          if (response && response.data && response.data.c !== undefined) {
            const marketPriceObj: marketPriceObjProps = {
              name: stock.name,
              currentPrice: response.data.c,
              currentDate: getFormattedDate()
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
      const savedTransactions = localStorage.getItem('MyPortfolio')
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions)
        this.myTransactions.push(...parsedTransactions)
      }

      const savedMarketPrices = localStorage.getItem('MarketPrices')
      if (savedMarketPrices) {
        const parsedPrices = JSON.parse(savedMarketPrices)
        this.marketPrices.push(...parsedPrices)
      }
    }
  }
})

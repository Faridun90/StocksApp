import { restClient } from '@polygon.io/client-js'
import { type IAggsResults } from '@/models/polygonTypes'

const rest = restClient(import.meta.env.VITE_POLY_API_KEY)

// https://polygon.io/docs/stocks/get_v3_reference_tickers
export const api = {
  async getStocks(): Promise<any> {
    const tickers = await rest.reference.tickers({ market: 'stocks', limit: 10 })
    return tickers.results
  },
  async getStock(stock: string): Promise<IAggsResults> {
    const ticker = await rest.stocks.previousClose(stock)

    if (ticker.results !== undefined) {
      console.log(ticker.results[0])
      return ticker.results[0]
    }
    return {}
  }
}

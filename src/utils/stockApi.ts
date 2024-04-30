import { restClient } from '@polygon.io/client-js'
const rest = restClient(import.meta.env.VITE_POLY_API_KEY)

// https://polygon.io/docs/stocks/get_v3_reference_tickers
export const api = {
  async getStocks(): Promise<any> {
    const tickers = await rest.reference.tickers({ market: 'stocks', limit: 1000 })
    return tickers.results
  },

  async getStock(stock: string): Promise<any> {
    const ticker = await rest.stocks.previousClose(`${stock}`)
    return ticker.results
  }
}

import { DefaultApi, type Quote } from 'finnhub-ts'
import type { AxiosResponse } from 'axios'
const finnhubClient = new DefaultApi({
  apiKey: import.meta.env.VITE_FINNHUB_API_KEY,
  isJsonMime: (input) => {
    try {
      JSON.parse(input)
      return true
    } catch (error) {
      console.log(error)
    }
    return false
  }
})
export const api2 = {
  async getStockNewPrice(stock: string): Promise<AxiosResponse<Quote, any>> {
    const newPrice = await finnhubClient.quote(stock)
    if (newPrice !== undefined) {
      // console.log(newPrice.data.c)
      return newPrice
    }
    return {} as any
  }
}

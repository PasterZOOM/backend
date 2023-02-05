import { currencyApi } from 'src/api/currency/currencyApi'
import { ICost } from 'src/common/interfaces/cost.interface'
import { ECost, TCost } from 'src/common/interfaces/cost.type'

export const getCoast = async (cost: number, currency: ECost): Promise<ICost> => {
  let costInBYN: number = cost

  if (currency !== ECost.BYN) {
    const rateCurrentCurrency = await currencyApi.getRate(currency)

    costInBYN = (cost * rateCurrentCurrency.Cur_OfficialRate) / rateCurrentCurrency.Cur_Scale
  }

  const allCosts = { BYN: Math.ceil(costInBYN) } as ICost

  await Promise.all(
    Object.keys(ECost)
      .filter(costKey => costKey !== ECost.BYN)
      .map(async costKey => {
        const rate = await currencyApi.getRate(costKey as TCost)

        allCosts[costKey] = Math.round((costInBYN * rate.Cur_Scale) / rate.Cur_OfficialRate)
      })
  )

  return allCosts
}

import { currencyApi } from 'src/api/currency/currencyApi'
import { CostEntity } from 'src/common/interfaces/cost.entity'

import { ECost, TCost } from '../../interfaces/cost.type'

export const getCoast = async (cost: number, currency: ECost): Promise<CostEntity> => {
  let costInBYN: number = cost

  if (currency !== ECost.BYN) {
    const rateCurrentCurrency = await currencyApi.getRate(currency)

    costInBYN = (cost * rateCurrentCurrency.Cur_OfficialRate) / rateCurrentCurrency.Cur_Scale
  }

  const allCosts = { BYN: Math.ceil(costInBYN) } as CostEntity

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

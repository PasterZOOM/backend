import { TCost } from 'common/interfaces/cost.type'

import { GetRateResponseType } from './getRateResponseType'

const BASE_URL = 'https://www.nbrb.by/api/exrates/rates'

export const currencyApi = {
  getRate: async (Cur_Abbreviation: TCost): Promise<GetRateResponseType> => {
    const res = await fetch(`${BASE_URL}/${Cur_Abbreviation}?parammode=2`)

    return res.json()
  },
}

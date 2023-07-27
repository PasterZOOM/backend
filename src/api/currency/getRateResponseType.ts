import { TCost } from 'src/common/interfaces/cost.type'

export type GetRateResponseType = {
  Cur_Abbreviation: TCost
  Cur_ID: number
  Cur_Name: string
  Cur_OfficialRate: number
  Cur_Scale: number
  Date: Date
}

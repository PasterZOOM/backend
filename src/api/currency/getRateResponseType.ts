import { TCost } from 'src/common/interfaces/cost.type'

export type GetRateResponseType = {
  Cur_ID: number
  Date: Date
  Cur_Abbreviation: TCost
  Cur_Scale: number
  Cur_Name: string
  Cur_OfficialRate: number
}

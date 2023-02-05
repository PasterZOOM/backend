export enum ECountry {
  ITALY = 'ITA',
  FRANCE = 'FRA',
  AMERICA = 'USA',
  BELARUS = 'BLR',
  RUSSIA = 'RUS',
}

export type TCountry = keyof typeof ECountry

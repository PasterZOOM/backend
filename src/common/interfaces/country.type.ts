export enum ECountry {
  AMERICA = 'USA',
  BELARUS = 'BLR',
  FRANCE = 'FRA',
  ITALY = 'ITA',
  RUSSIA = 'RUS',
}

export type TCountry = keyof typeof ECountry

export enum ECost {
  BYN = 'BYN',
  CNY = 'CNY',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  RUB = 'RUB',
  UAH = 'UAH',
  USD = 'USD',
}

export type TCost = keyof typeof ECost

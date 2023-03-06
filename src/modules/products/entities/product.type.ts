export enum EProductCategory {
  FOR_CLOTH = 'FOR_CLOTH',
  FOR_CARDS = 'FOR_CARDS',
  FOR_CASH = 'FOR_CASH',
  FOR_COINS = 'FOR_COINS',
  FOR_DOCUMENTS = 'FOR_DOCUMENTS',
  FOR_WATCH = 'FOR_WATCH',
  FOR_AIRPODS = 'FOR_AIRPODS',
}
export enum EProductType {
  AUTODOC_HOLDER = 'AUTODOC_HOLDER',
  BELT = 'BELT',
  BIFOLD_WALLET = 'BIFOLD_WALLET',
  CARD_HOLDER = 'CARD_HOLDER',
  DOC_HOLDER = 'DOC_HOLDER',
  PASSPORT_COVER = 'PASSPORT_COVER',
  PURSE = 'PURSE',
  WATCH_STRAP = 'WATCH_STRAP',
}

export type TProductCategory = keyof typeof EProductCategory
export type TProductType = keyof typeof EProductType

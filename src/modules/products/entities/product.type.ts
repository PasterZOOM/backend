export enum EProductAssignment {
  FOR_CLOTH = 'for_cloth',
  FOR_CARDS = 'for_cards',
  FOR_CASH = 'for_cash',
  FOR_COINS = 'for_coins',
  FOR_DOCUMENTS = 'for_documents',
  FOR_WATCH = 'for_watch',
  FOR_AIRPODS = 'for_airpods',
}
export enum EProductCategory {
  AUTODOC_HOLDER = 'autodoc_holder',
  BELT = 'belt',
  BIFOLD_WALLET = 'bifold_wallet',
  CARD_HOLDER = 'card_holder',
  DOC_HOLDER = 'doc_holder',
  PASSPORT_COVER = 'passport_cover',
  PURSE = 'purse',
  WATCH_STRAP = 'watch_strap',
}

export type TProductAssignment = keyof typeof EProductAssignment
export type TProductCategory = keyof typeof EProductCategory

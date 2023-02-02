export enum EDeliveryMethod {
  BEL_POST = 'BEL_POST',
  CDEK = 'CDEK',
  COURIER = 'COURIER',
  EURO_POST = 'EURO_POST',
  SELF_DELIVERY = 'SELF_DELIVERY',
}
export enum EDeliveryPlace {
  OFFICE = 'OFFICE',
  ADDRESS = 'ADDRESS',
}

export type TDeliveryMethod = keyof typeof EDeliveryMethod
export type TDeliveryPlace = keyof typeof EDeliveryPlace

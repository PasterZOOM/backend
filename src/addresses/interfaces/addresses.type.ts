export enum DeliveryMethod {
  BEL_POST = 'BEL_POST',
  CDEK = 'CDEK',
  COURIER = 'COURIER',
  EURO_POST = 'EURO_POST',
  SELF_DELIVERY = 'SELF_DELIVERY',
}
export enum DeliveryPlace {
  OFFICE = 'OFFICE',
  ADDRESS = 'ADDRESS',
}

export type TDeliveryMethod = keyof typeof DeliveryMethod
export type TDeliveryPlace = keyof typeof DeliveryPlace

export enum EOrderStatus {
  CANCELED = 'CANCELED',
  DELIVERED = 'DELIVERED',
  DELIVERY_WAITING = 'DELIVERY_WAITING',
  PAYMENT_WAITING = 'PAYMENT_WAITING',
  PROCESSED = 'PROCESSED',
  PRODUCED = 'PRODUCED',
  QUEUE = 'QUEUE',
  READY = 'READY',
  REGISTERED = 'REGISTERED',
  SEND = 'SEND',
}
export enum EPaymentFor {
  RECIPIENT = 'RECIPIENT',
  SENDER = 'SENDER',
}

export type TOrderStatus = keyof typeof EOrderStatus
export type TPaymentFor = keyof typeof EPaymentFor

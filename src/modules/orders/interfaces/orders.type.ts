export enum EOrderStatus {
  CANCELED = 'canceled',
  DELIVERED = 'delivered',
  DELIVERY_WAITING = 'delivery waiting',
  PAYMENT_WAITING = 'payment waiting',
  PROCESSED = 'processed',
  PRODUCED = 'produced',
  QUEUE = 'queue',
  READY = 'ready',
  REGISTERED = 'registered',
  SEND = 'send',
}
enum EPaymentFor {
  RECIPIENT = 'recipient',
  SENDER = 'sender',
}

export type TOrderStatus = keyof typeof EOrderStatus
export type TPaymentFor = keyof typeof EPaymentFor

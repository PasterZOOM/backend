export enum CommunicationMethod {
  EMAIL = 'EMAIL',
  INSTAGRAM = 'INSTAGRAM',
  PHONE = 'PHONE',

  TELEGRAM = 'TELEGRAM',
  VIBER = 'VIBER',
  VK = 'VK',
  WHATS_APP = 'WHATS_APP',
}
export enum Subscription {
  All = 'All',
  NEWS = 'NEWS',
  NONE = 'NONE',
  PROMOTIONS = 'PROMOTIONS',
}
export enum PersonRole {
  BANNED = 'BANNED',
  CUSTOMER = 'CUSTOMER',
  LID = 'LID',
}
export enum Gender {
  NONE = 'NONE',
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export type TCommunicationMethod = keyof typeof CommunicationMethod
export type TSubscription = keyof typeof Subscription
export type TPersonRole = keyof typeof PersonRole
export type TGender = keyof typeof Gender

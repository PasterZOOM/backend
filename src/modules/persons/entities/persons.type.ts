export enum ECommunicationMethod {
  EMAIL = 'EMAIL',
  INSTAGRAM = 'INSTAGRAM',
  PHONE = 'PHONE',
  TELEGRAM = 'TELEGRAM',
  VIBER = 'VIBER',
  VK = 'VK',
  WHATS_APP = 'WHATS_APP',
}
export enum ESubscription {
  All = 'All',
  NEWS = 'NEWS',
  NONE = 'NONE',
  PROMOTIONS = 'PROMOTIONS',
}
export enum EPersonRole {
  BANNED = 'BANNED',
  CUSTOMER = 'CUSTOMER',
  LID = 'LID',
}
export enum EGender {
  NONE = 'NONE',
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export type TCommunicationMethod = keyof typeof ECommunicationMethod
export type TSubscription = keyof typeof ESubscription
export type TPersonRole = keyof typeof EPersonRole
export type TGender = keyof typeof EGender

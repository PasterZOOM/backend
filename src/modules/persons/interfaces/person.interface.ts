import { TCommunicationMethod, TGender, TPersonRole, TSubscription } from './persons.type'

export interface IPerson {
  _id: string
  addressIds: string[]
  communicationMethod: TCommunicationMethod
  created: string
  description: string
  email: string
  firstName: string
  gender: TGender
  instagram: string
  lastName: string
  orderIds: string[]
  patronymic: string
  phone: string
  role: TPersonRole
  subscription: TSubscription
  telegram: string
  viber: string
  vk: string
  whatsApp: string
}

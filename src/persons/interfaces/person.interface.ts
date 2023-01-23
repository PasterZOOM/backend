import {
  CommunicationMethod,
  Gender,
  PersonRole,
  Subscription,
} from 'src/persons/interfaces/persons.type'

export interface IPerson {
  addressIds: string[]
  communicationMethod: CommunicationMethod
  created: string
  description: string
  email: string
  firstName: string
  gender: Gender
  instagram: string
  lastName: string
  orderIds: string[]
  patronymic: string
  phone: string
  role: PersonRole
  subscription: Subscription
  telegram: string
  viber: string
  vk: string
  whatsApp: string
}

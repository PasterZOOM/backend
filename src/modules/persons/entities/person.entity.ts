import { ApiProperty } from '@nestjs/swagger'

import {
  ECommunicationMethod,
  EGender,
  EPersonRole,
  ESubscription,
  TCommunicationMethod,
  TGender,
  TPersonRole,
  TSubscription,
} from './persons.type'

export class PersonEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер персоны' })
  _id: string

  @ApiProperty({
    type: [String],
    description: 'масив содержащий id адресов пренадлежащих персоне, индекс 0 - ОСНОВНОЙ адрес',
  })
  addressIds: string[]

  @ApiProperty({
    enum: ECommunicationMethod,
    enumName: 'ECommunicationMethod',
    description: 'предпочтительный способ связи',
  })
  communicationMethod: TCommunicationMethod

  @ApiProperty({ type: String, description: 'дата создания персоны в базе' })
  created: string

  @ApiProperty({ type: String, description: 'описание персоны' })
  description: string

  @ApiProperty({ type: String, description: 'email персоны' })
  email?: string = ''

  @ApiProperty({ type: String, description: 'имя персоны' })
  firstName: string

  @ApiProperty({ enum: EGender, enumName: 'EGender', description: 'пол персоны' })
  gender?: TGender = EGender.NONE

  @ApiProperty({ type: String, description: 'instagram персоны' })
  instagram: string

  @ApiProperty({ type: String, description: 'имя персоны' })
  lastName: string

  @ApiProperty({ type: [String], description: 'масив содержащий id заказов пренадлежащих персоне' })
  orderIds: string[]

  @ApiProperty({ type: String, description: 'отчество персоны' })
  patronymic?: string = ''

  @ApiProperty({ type: String, description: 'телефонный номер персоны' })
  phone: string

  @ApiProperty({ enum: EPersonRole, enumName: 'EPersonRole', description: 'роль персоны' })
  role: TPersonRole

  @ApiProperty({ enum: ESubscription, enumName: 'ESubscription', description: 'подписки персоны' })
  subscription?: TSubscription = ESubscription.NONE

  @ApiProperty({ type: String, description: 'номер telegram' })
  telegram?: string = ''

  @ApiProperty({ type: String, description: 'номер viber' })
  viber?: string = ''

  @ApiProperty({ type: String, description: 'ссылка на вконтакте' })
  vk?: string = ''

  @ApiProperty({ type: String, description: 'номер whatsApp' })
  whatsApp?: string = ''
}

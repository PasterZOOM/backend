import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { EDeliveryMethod, EDeliveryPlace, TDeliveryMethod, TDeliveryPlace } from './addresses.type'

export class AddressEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер адреса' })
  _id: Types.ObjectId

  @ApiProperty({ type: String, description: 'номер квартиры' })
  apartment?: string = ''

  @ApiProperty({ type: String, description: 'название города' })
  city: string

  @ApiProperty({ type: String, description: 'название страны' })
  country: string

  @ApiProperty({ type: Date, description: 'дата создания' })
  created?: Date

  @ApiProperty({
    enum: EDeliveryPlace,
    enumName: 'EDeliveryPlace',
    description: 'куда производиться доставка',
  })
  deliveryPlace: TDeliveryPlace

  @ApiProperty({ type: String, description: 'номер дома' })
  house: string

  @ApiProperty({ type: String, description: 'индекс отделения' })
  index?: string = ''

  @ApiProperty({
    type: String,
    description: 'идентификационный номер владельца адреса',
  })
  ownerId: Types.ObjectId

  @ApiProperty({ type: String, description: 'регион/область' })
  region: string

  @ApiProperty({ type: String, description: 'название улицы' })
  street: string

  @ApiProperty({
    enum: EDeliveryMethod,
    enumName: 'EDeliveryMethod',
    description: 'название транспортной компании',
  })
  transportCompany: TDeliveryMethod
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { AddressEntity } from '../entities/address.entity'
import {
  EDeliveryMethod,
  EDeliveryPlace,
  TDeliveryMethod,
  TDeliveryPlace,
} from '../entities/addresses.type'

export type AddressDocument = Address & Document

@Schema()
export class Address implements Omit<AddressEntity, '_id'> {
  @Prop({ default: '' })
  apartment: string

  @Prop({ default: '' })
  city: string

  @Prop({ default: '' })
  country: string

  @Prop({ default: new Date() })
  created: Date

  @Prop({ default: EDeliveryPlace.ADDRESS })
  deliveryPlace: TDeliveryPlace

  @Prop({ default: '' })
  house: string

  @Prop({ default: '' })
  index: string

  @Prop({ default: '' })
  ownerId: string

  @Prop({ default: '' })
  region: string

  @Prop({ default: '' })
  street: string

  @Prop({ default: EDeliveryMethod.BEL_POST })
  transportCompany: TDeliveryMethod
}

export const AddressSchema = SchemaFactory.createForClass(Address)

export const AddressAlias = Address.name

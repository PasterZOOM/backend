import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IAddress } from 'src/addresses/interfaces/address.interface'
import {
  DeliveryMethod,
  DeliveryPlace,
  TDeliveryMethod,
  TDeliveryPlace,
} from 'src/addresses/interfaces/addresses.type'

export type AddressDocument = Address & Document

@Schema()
export class Address implements Omit<IAddress, '_id'> {
  @Prop({ default: '' })
  apartment: string

  @Prop({ default: '' })
  city: string

  @Prop({ default: '' })
  country: string

  @Prop({ default: new Date().toISOString() })
  created: string

  @Prop({ default: '' })
  personId: string

  @Prop({ default: DeliveryPlace.ADDRESS })
  deliveryPlace: TDeliveryPlace

  @Prop({ default: '' })
  house: string

  @Prop({ default: '' })
  index: string

  @Prop({ default: '' })
  region: string

  @Prop({ default: '' })
  street: string

  @Prop({ default: DeliveryMethod.BEL_POST })
  transportCompany: TDeliveryMethod
}

export const AddressSchema = SchemaFactory.createForClass(Address)

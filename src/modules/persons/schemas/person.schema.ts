import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { IPerson } from '../interfaces/person.interface'
import {
  ECommunicationMethod,
  EGender,
  EPersonRole,
  ESubscription,
  TCommunicationMethod,
  TGender,
  TSubscription,
} from '../interfaces/persons.type'

export type PersonDocument = Person & Document

@Schema()
export class Person implements Omit<IPerson, '_id'> {
  @Prop({ type: [String], default: [] })
  addressIds: string[]

  @Prop({ default: ECommunicationMethod.PHONE })
  communicationMethod: TCommunicationMethod

  @Prop({ default: new Date().toISOString() })
  created: string

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  email: string

  @Prop({ required: true })
  firstName: string

  @Prop({ default: EGender.NONE })
  gender: TGender

  @Prop({ default: '' })
  instagram: string

  @Prop({ required: true })
  lastName: string

  @Prop({ type: [String], default: [] })
  orderIds: string[]

  @Prop({ default: '' })
  patronymic: string

  @Prop({ required: true })
  phone: string

  @Prop({ default: EPersonRole.LID })
  role: EPersonRole

  @Prop({ default: ESubscription.NONE })
  subscription: TSubscription

  @Prop({ default: '' })
  telegram: string

  @Prop({ default: '' })
  viber: string

  @Prop({ default: '' })
  vk: string

  @Prop({ default: '' })
  whatsApp: string
}

export const PersonSchema = SchemaFactory.createForClass(Person)

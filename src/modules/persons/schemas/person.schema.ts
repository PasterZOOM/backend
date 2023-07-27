import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

import { PersonEntity } from '../entities/person.entity'
import {
  ECommunicationMethod,
  EGender,
  EPersonRole,
  ESubscription,
  TCommunicationMethod,
  TGender,
  TSubscription,
} from '../entities/persons.type'

export type PersonDocument = Document & Person

@Schema()
export class Person implements Omit<PersonEntity, '_id'> {
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  addressIds: Types.ObjectId[]

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

  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  orderIds: Types.ObjectId[]

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

export const PersonAlias = Person.name

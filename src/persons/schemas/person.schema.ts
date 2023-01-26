import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IPerson } from 'src/persons/interfaces/person.interface'

import { CommunicationMethod, Gender, PersonRole, Subscription } from '../interfaces/persons.type'

export type PersonDocument = Person & Document

@Schema()
export class Person implements IPerson {
  @Prop({ type: [String], default: [] })
  addressIds: string[]

  @Prop({ default: CommunicationMethod.PHONE })
  communicationMethod: CommunicationMethod

  @Prop({ default: new Date().toISOString() })
  created: string

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  email: string

  @Prop({ required: true })
  firstName: string

  @Prop({ default: Gender.NONE })
  gender: Gender

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

  @Prop({ default: PersonRole.LID })
  role: PersonRole

  @Prop({ default: Subscription.NONE })
  subscription: Subscription

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

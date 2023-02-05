import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TCountry } from 'src/common/interfaces/country.type'

import { ILeatherFactory } from '../interfaces/leather-factory.interface'

export type LeatherFactoryDocument = LeatherFactory & Document

@Schema()
export class LeatherFactory implements Omit<ILeatherFactory, '_id'> {
  @Prop({ type: [String], default: [] })
  articles: string[]

  @Prop({ default: '' })
  country: TCountry

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  name: string
}

export const LeatherFactorySchema = SchemaFactory.createForClass(LeatherFactory)

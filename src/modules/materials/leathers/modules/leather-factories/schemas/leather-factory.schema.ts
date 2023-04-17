import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { TCountry } from 'src/common/interfaces/country.type'

import { LeatherFactoryEntity } from '../entities/leather-factory.entity'

export type LeatherFactoryDocument = LeatherFactory & Document

@Schema()
export class LeatherFactory implements Omit<LeatherFactoryEntity, '_id'> {
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  articles: Types.ObjectId[]

  @Prop({ default: '' })
  country: TCountry

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  title: string
}

export const LeatherFactorySchema = SchemaFactory.createForClass(LeatherFactory)

export const LeatherFactoryAlias = LeatherFactory.name

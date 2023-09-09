import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'common/entities/locale-field.entity'
import { TCountry } from 'common/interfaces/country.type'

import { LeatherFactoryEntity } from '../entities/leather-factory.entity'

export type LeatherFactoryDocument = Document & LeatherFactory

@Schema()
export class LeatherFactory implements Omit<LeatherFactoryEntity, '_id'> {
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  articles: Types.ObjectId[]

  @Prop({ default: '' })
  country: TCountry

  @Prop({ default: { en: '', ru: '' } })
  description: LocaleFieldEntity

  @Prop({ default: { en: '', ru: '' } })
  title: LocaleFieldEntity
}

export const LeatherFactorySchema = SchemaFactory.createForClass(LeatherFactory)

export const LeatherFactoryAlias = LeatherFactory.name

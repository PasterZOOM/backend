import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'common/entities/locale-field.entity'

import { LeatherArticleEntity } from '../entities/leather-article.entity'

export type LeatherArticleDocument = Document & LeatherArticle

@Schema()
export class LeatherArticle implements Omit<LeatherArticleEntity, '_id'> {
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  colors: Types.ObjectId[]

  @Prop({ default: {} })
  description: LocaleFieldEntity

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  factory: Types.ObjectId

  @Prop({ type: String, default: '' })
  value: string

  @Prop({ default: {} })
  title: LocaleFieldEntity
}

export const LeatherArticleSchema = SchemaFactory.createForClass(LeatherArticle)

export const LeatherArticleAlias = LeatherArticle.name

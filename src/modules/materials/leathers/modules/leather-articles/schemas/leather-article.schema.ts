import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

import { LeatherArticleEntity } from '../entities/leather-article.entity'

export type LeatherArticleDocument = LeatherArticle & Document

@Schema()
export class LeatherArticle implements Omit<LeatherArticleEntity, '_id'> {
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  colors: Types.ObjectId[]

  @Prop({ default: '' })
  description: string

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  factory: Types.ObjectId

  @Prop({ default: '' })
  title: string
}

export const LeatherArticleSchema = SchemaFactory.createForClass(LeatherArticle)

export const LeatherArticleAlias = LeatherArticle.name

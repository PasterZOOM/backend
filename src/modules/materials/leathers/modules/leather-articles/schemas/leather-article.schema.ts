import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { LeatherArticleEntity } from '../entities/leather-article.entity'

export type LeatherArticleDocument = LeatherArticle & Document

@Schema()
export class LeatherArticle implements Omit<LeatherArticleEntity, '_id'> {
  @Prop({ type: [String], default: [] })
  colors: string[]

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  factory: string

  @Prop({ default: '' })
  name: string
}

export const LeatherArticleSchema = SchemaFactory.createForClass(LeatherArticle)

export const LeatherArticleAlias = LeatherArticle.name

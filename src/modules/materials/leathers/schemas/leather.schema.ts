import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

import { LeatherEntity } from '../entities/leather.entity'

export type LeatherDocument = Leather & Document

@Schema()
export class Leather implements Omit<LeatherEntity, '_id'> {
  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  article: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  color: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  factory: Types.ObjectId

  @Prop({ default: '' })
  thickness: string
}

export const LeatherSchema = SchemaFactory.createForClass(Leather)

export const LeatherAlias = Leather.name

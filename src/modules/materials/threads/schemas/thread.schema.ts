import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ThreadEntity } from '../entities/thread.entity'

export type ThreadDocument = Thread & Document

@Schema()
export class Thread implements Omit<ThreadEntity, '_id'> {
  @Prop({ default: '' })
  color: string

  @Prop({ default: '' })
  colorCode: string

  @Prop({ default: '' })
  manufacturer: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: '' })
  thickness: string

  @Prop({ default: '' })
  thicknessCode: string
}

export const ThreadSchema = SchemaFactory.createForClass(Thread)

export const ThreadAlias = Thread.name

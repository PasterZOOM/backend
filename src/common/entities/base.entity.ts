import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class BasEntity {
  @ApiProperty({ type: String })
  _id: Types.ObjectId

  @ApiProperty({ type: String })
  title: string
}

import { ApiProperty } from '@nestjs/swagger'

export class BasicProductPhotoEntity {
  @ApiProperty({
    type: String,
    description: 'Идентификационный номер фотографии',
  })
  _id: string

  @ApiProperty({
    type: String,
    description: 'Адрес фотографии',
  })
  path: string
}

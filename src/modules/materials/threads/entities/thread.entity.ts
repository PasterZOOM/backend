import { ApiProperty } from '@nestjs/swagger'

export class ThreadEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер нити' })
  _id: string

  @ApiProperty({ type: String, description: 'цвет нити' })
  color: string

  @ApiProperty({ type: String, description: 'код цвета по каталогу' })
  colorCode: string

  @ApiProperty({ type: String, description: 'фабрика производитель' })
  manufacturer: string

  @ApiProperty({ type: String, description: 'фото нити' })
  photo: string

  @ApiProperty({ type: String, description: 'толщина нити' })
  thickness: string

  @ApiProperty({ type: String, description: 'код толщины' })
  thicknessCode: string
}

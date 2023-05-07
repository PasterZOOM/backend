import { ApiProperty } from '@nestjs/swagger'
import { ELeatherColor } from 'src/modules/materials/leathers/modules/leather-colors/entities/leather-colors.type'

export class LeatherColorResponse {
  @ApiProperty({
    type: String,
    description: 'код цвета кожи',
  })
  code: string

  @ApiProperty({ type: String, description: 'фото цвета кожи' })
  photo: string

  @ApiProperty({
    type: String,
    description: 'название цвета',
  })
  title: string

  @ApiProperty({
    enum: ELeatherColor,
    enumName: 'ELeatherColor',
    description: 'к какой категории цветов относится цвет',
  })
  value: string

  @ApiProperty({ type: String, description: 'описание цвета' })
  description: string
}

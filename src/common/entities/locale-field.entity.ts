import { ApiProperty } from '@nestjs/swagger'

export class LocaleFieldEntity {
  @ApiProperty({ type: String, default: '' })
  en?: string = ''

  @ApiProperty({ type: String, default: '' })
  ru?: string = ''
}

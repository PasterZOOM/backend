import { ApiProperty } from '@nestjs/swagger'

export class LeatherArticleResponse {
  @ApiProperty({ type: String, description: 'описание артикула' })
  description: string

  @ApiProperty({ type: String, description: 'название артикула' })
  title: string

  @ApiProperty({ type: String, description: 'значение артикула для поиска' })
  value: string
}

import { ApiProperty, OmitType } from '@nestjs/swagger'
import { BasEntity } from 'common/entities/base.entity'
import { LeatherArticleEntity } from 'modules/materials/leathers/modules/leather-articles/entities/leather-article.entity'

export class LeatherArticleResponse extends OmitType(LeatherArticleEntity, [
  'title',
  'description',
  'factory',
]) {
  @ApiProperty({ type: String, description: 'описание артикула' })
  description: string

  @ApiProperty({ type: String, description: 'название артикула' })
  title: string

  @ApiProperty({ type: [BasEntity], description: 'цвета в которых бывает артикул' })
  colors: BasEntity[]

  @ApiProperty({ type: BasEntity, description: 'фабрика которая производит данный артикул' })
  factory: BasEntity
}

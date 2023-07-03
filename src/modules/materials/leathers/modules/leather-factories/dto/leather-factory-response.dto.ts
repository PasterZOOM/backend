import { ApiProperty, OmitType } from '@nestjs/swagger'
import { BasEntity } from 'src/common/entities/base.entity'

import { LeatherFactoryEntity } from '../entities/leather-factory.entity'

export class LeatherFactoryResponse extends OmitType(LeatherFactoryEntity, [
  'articles',
  'title',
  'description',
]) {
  @ApiProperty({ type: [BasEntity], description: 'Артикулы кож которые выпускает фабрика' })
  articles: BasEntity[]

  @ApiProperty({
    type: String,
    description: 'Название фабрики на языке локали',
  })
  title: string

  @ApiProperty({
    type: String,
    description: 'Описание фабрики на языке локали',
  })
  description: string
}

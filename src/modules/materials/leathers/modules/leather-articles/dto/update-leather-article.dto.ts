import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { LeatherArticleEntity } from '../entities/leather-article.entity'

import { CreateLeatherArticleDto } from './create-leather-article.dto'

export class UpdateLeatherArticleDto extends PartialType(
  IntersectionType(CreateLeatherArticleDto, PickType(LeatherArticleEntity, ['factory']))
) {}

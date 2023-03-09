import { IntersectionType, PartialType } from '@nestjs/swagger'

import { CreateLeatherArticleDto } from './create-leather-article.dto'

export class UpdateLeatherArticleDto extends PartialType(
  IntersectionType(CreateLeatherArticleDto)
) {}

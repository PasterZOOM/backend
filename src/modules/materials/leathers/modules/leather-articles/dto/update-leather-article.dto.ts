import { OmitType, PartialType } from '@nestjs/mapped-types'

import { CreateLeatherArticleDto } from './create-leather-article.dto'

export class UpdateLeatherArticleDto extends PartialType(
  OmitType(CreateLeatherArticleDto, ['factory'])
) {}

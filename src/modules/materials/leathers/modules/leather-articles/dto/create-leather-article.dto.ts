import { OmitType } from '@nestjs/swagger'

import { LeatherArticleEntity } from '../entities/leather-article.entity'

export class CreateLeatherArticleDto extends OmitType(LeatherArticleEntity, ['_id', 'factory']) {}

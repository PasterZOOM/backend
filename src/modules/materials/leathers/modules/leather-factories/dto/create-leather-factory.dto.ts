import { OmitType } from '@nestjs/swagger'

import { LeatherFactoryEntity } from '../entities/leather-factory.entity'

export class CreateLeatherFactoryDto extends OmitType(LeatherFactoryEntity, ['_id']) {}

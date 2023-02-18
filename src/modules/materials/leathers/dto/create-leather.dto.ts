import { OmitType } from '@nestjs/swagger'

import { LeatherEntity } from '../entities/leather.entity'

export class CreateLeatherDto extends OmitType(LeatherEntity, ['_id']) {}

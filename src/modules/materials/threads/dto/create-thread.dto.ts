import { OmitType } from '@nestjs/swagger'

import { ThreadEntity } from '../entities/thread.entity'

export class CreateThreadDto extends OmitType(ThreadEntity, ['_id']) {}

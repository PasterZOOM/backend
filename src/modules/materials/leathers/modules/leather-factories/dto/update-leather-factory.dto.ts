import { PartialType } from '@nestjs/mapped-types'

import { CreateLeatherFactoryDto } from './create-leather-factory.dto'

export class UpdateLeatherFactoryDto extends PartialType(CreateLeatherFactoryDto) {}

import { PartialType } from '@nestjs/mapped-types'

import { CreateLeatherDto } from './create-leather.dto'

export class UpdateLeatherDto extends PartialType(CreateLeatherDto) {}

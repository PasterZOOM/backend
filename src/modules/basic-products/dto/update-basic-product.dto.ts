import { IntersectionType, PartialType } from '@nestjs/swagger'

import { CreateBasicProductDto } from './create-basic-product.dto'

export class UpdateBasicProductDto extends PartialType(IntersectionType(CreateBasicProductDto)) {}

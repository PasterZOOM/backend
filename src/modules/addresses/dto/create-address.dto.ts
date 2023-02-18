import { OmitType } from '@nestjs/swagger'

import { AddressEntity } from '../entities/address.entity'

export class CreateAddressDto extends OmitType(AddressEntity, ['_id', 'created', 'ownerId']) {}

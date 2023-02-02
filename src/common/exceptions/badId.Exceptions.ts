import { NotFoundException } from '@nestjs/common'

import { toCapitalizeWord } from '../utils/string/toCapitalizeWord'

export class BadIdException extends NotFoundException {
  constructor(essence: string, e) {
    super(`${toCapitalizeWord(essence)} with this id is not in the database`, {
      cause: new Error(),
      description: e.message,
    })
  }
}

import { CommunicationMethod, Gender, Subscription } from 'src/persons/interfaces/persons.type'

export class CreatePersonDto {
  readonly communicationMethod: CommunicationMethod

  readonly email?: string

  readonly firstName: string

  readonly gender?: Gender

  readonly instagram: string

  readonly lastName: string

  readonly patronymic?: string

  readonly phone: string

  readonly subscription?: Subscription

  readonly telegram?: string

  readonly viber?: string

  readonly vk?: string

  readonly whatsApp?: string
}

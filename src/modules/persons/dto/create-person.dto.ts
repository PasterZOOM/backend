import { TCommunicationMethod, TGender, TSubscription } from '../interfaces/persons.type'

export class CreatePersonDto {
  readonly communicationMethod: TCommunicationMethod

  readonly email?: string

  readonly firstName: string

  readonly gender?: TGender

  readonly instagram: string

  readonly lastName: string

  readonly patronymic?: string

  readonly phone: string

  readonly subscription?: TSubscription

  readonly telegram?: string

  readonly viber?: string

  readonly vk?: string

  readonly whatsApp?: string
}

import { to2digit } from '../date/to2digit'

export const getOrderNumber = (): string => {
  const date = new Date()

  return `${to2digit(date.getFullYear())}${to2digit(date.getMonth())}${to2digit(
    date.getDate()
  )}${to2digit(date.getHours())}${to2digit(date.getMinutes())}${to2digit(date.getSeconds())}`
}

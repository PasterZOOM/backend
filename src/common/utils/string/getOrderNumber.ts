import { to2digit } from '../date/to2digit'

export const getOrderNumber = (): string => {
  const now = new Date()

  const year = to2digit(now.getFullYear())
  const month = to2digit(now.getMonth() + 1)
  const date = to2digit(now.getDate())
  const hours = to2digit(now.getHours())
  const minutes = to2digit(now.getMinutes())
  const seconds = to2digit(now.getSeconds())

  return `${year}${month}${date}${hours}${minutes}${seconds}`
}

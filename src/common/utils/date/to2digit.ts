const twoDigit = -2

export const to2digit = (value: number | string): string => {
  return `0${value.toString()}`.slice(twoDigit)
}

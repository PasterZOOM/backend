const twoDigit = -2

export const to2digit = (value: string | number): string => {
  return `0${value.toString()}`.slice(twoDigit)
}

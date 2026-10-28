import { isNumeric } from './isNumeric.ts'

export const ifIsNumericAsNumber = (value: unknown) =>
  isNumeric(value) ? +(value as string | number) : value

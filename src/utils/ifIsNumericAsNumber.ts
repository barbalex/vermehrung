import { isNumeric } from './isNumeric.ts'

export const ifIsNumericAsNumber = (value: string | number) =>
  isNumeric(value) ? +value : value

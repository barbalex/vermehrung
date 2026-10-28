import { isNumeric } from './isNumeric.ts'

export const ifIsNumericAsNumber = (value) =>
  isNumeric(value) ? +value : value

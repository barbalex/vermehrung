import { isNumeric } from './isNumeric.js'

export const ifIsNumericAsNumber = (value) =>
  isNumeric(value) ? +value : value

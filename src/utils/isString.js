import { isNumeric } from './isNumeric.js'

export default (val) =>
  !isNumeric(val) && typeof val !== 'boolean' && val !== null

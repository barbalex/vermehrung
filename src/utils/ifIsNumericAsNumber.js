import isNumeric from './isNumeric.js'

export default (value) => (isNumeric(value) ? +value : value)

import isNumeric from './isNumeric'

export default val => !isNumeric(val) && typeof val !== 'boolean'

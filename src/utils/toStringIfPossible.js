/**
 * This is necessary because:
 * - null and undefined have no toString function
 */
export default (val) => {
  if (val === null) return val
  if (val === undefined) return val
  if (val.toString) return val.toString()
  return val
}

import types from '../store/Filter/simpleTypes'

/**
 * TODO:
 * This is bad
 * because it bogs down cpu
 * pass filter directly to query instead
 */

export default ({ rows, filter, table }) => {
  const nodeFilterArray = Object.entries(filter[table]).filter(
    // eslint-disable-next-line no-unused-vars
    ([key, value]) => value || value === 0 || value === false,
  )

  return rows.filter(row => {
    if (nodeFilterArray.length === 0) return true
    let type = 'string'
    return nodeFilterArray.every(([key, value]) => {
      if (row[key] === null || row[key] === undefined) return false
      if (table && types[table] && types[table][key]) {
        type = types[table][key]
      }
      if (['uuid', 'boolean'].includes(type)) {
        // eslint-disable-next-line eqeqeq
        return row[key] === value
      }
      // must be string or date
      return row[key]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    })
  })
}

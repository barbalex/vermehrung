// NOT IN USE
import types from '../store/Filter/simpleTypes.js'

const test = ({ val, filterValues, table }) =>
  filterValues.every(([key, filterValue]) => {
    if (filterValue === null) return true
    const type = types[table][key] || 'string'
    const value = val[key]
    if (type === 'string' && value) {
      if (
        value?.toString()?.toLowerCase() &&
        filterValue?.toString()?.toLowerCase()
      ) {
        return value
          .toString()
          .toLowerCase()
          .includes(filterValue.toString().toLowerCase())
      }
      return value.includes(filterValue)
    }
    return value === filterValue
  })

// filter is a passed filter for cases like:
// list of teilkulturs of a kultur
// > kultur_id is passed as filter
const applyStoreFilter = ({ filter, value: val, table }) => {
  const filterValues = Object.entries(filter).filter(
    (e) => !!e?.[1] || e?.[1] === false,
  )

  if (!filterValues.length) return true

  return test({ val, filterValues, table })
}

export default applyStoreFilter

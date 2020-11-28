import types from '../models/Filter/simpleTypes'
// filter is a passed filter for cases like:
// list of teilkulturs of a kultur
// > kultur_id is passed as filter
const applyStoreFilter = ({ store, values, table }) => {
  const { filter: storeFilter } = store

  const filterValues = Object.entries(storeFilter[table]).filter(
    (e) => !!e?.[1] || e?.[1] === false,
  )

  if (!filterValues.length) return values

  const test = (val) =>
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

  return values.filter(test)
}

export default applyStoreFilter

import types from '../models/Filter/simpleTypes'

export default ({ store, table }) => {
  const { filter: storeFilter } = store
  const deletedTableFilter = {
    _or: [
      { _deleted: { _eq: false } },
      // filtering for empty array, see: https://stackoverflow.com/a/737678/712005
      {
        _and: [{ _deleted: { _eq: false } }, { _conflicts: { _neq: '{}' } }],
      },
    ],
  }
  let filter = { id: { _is_null: false } }
  if (storeFilter[table]._deleted === false) {
    filter = {
      ...filter,
      ...deletedTableFilter,
    }
  }

  if (!storeFilter[table]) return filter
  if (!Object.entries(storeFilter[table]).length) return filter

  const filterValues = [...Object.entries(storeFilter[table])].filter(
    (e) => e[1] || e[1] === 0,
  )

  filterValues.forEach(([key, value]) => {
    const type = types[table][key] || 'string'
    if (type === 'string') {
      filter[key] = { _ilike: `%${value}%` }
    } else {
      filter[key] = { _eq: value }
    }
  })

  // remove id: {_is_null: false} if there are more criteria
  if (Object.keys(filter).length > 1) {
    delete filter.id
  }

  return filter
}

import types from '../models/Filter/simpleTypes'

export default ({ store, table, filter: filterPassed = {} }) => {
  const { filter: storeFilter, showDeleted, hideInactive } = store
  const filter = { ...{ id: { _is_null: false } }, ...filterPassed }
  if (['person', 'garten', 'kultur'].includes(table) && hideInactive) {
    filter.aktiv = { _eq: true }
  }

  if (!storeFilter[table]) return filter
  if (!Object.entries(storeFilter[table]).length) return filter

  const filterValues = [
    ...Object.entries(storeFilter[table]),
    ...Object.entries(filterPassed),
  ].filter((e) => e[1] || e[1] === 0)

  filterValues.forEach(([key, value]) => {
    const type = types[table][key] || 'string'
    if (type === 'string') {
      filter[key] = { _ilike: `%${value}%` }
    } else {
      filter[key] = { _eq: value }
    }
  })

  if (!showDeleted) {
    // filtering for empty array, see: https://stackoverflow.com/a/737678/712005
    filter._and = [{ _deleted: { _eq: false } }, { _conflicts: { _eq: '{}' } }]
  }

  // remove id: {_is_null: false} if there are more criteria
  if (Object.keys(filter).length > 1) {
    delete filter.id
  }

  return filter
}

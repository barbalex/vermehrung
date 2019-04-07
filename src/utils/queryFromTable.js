import types from '../store/Filter/simpleTypes'

export default ({ store, table }) => {
  const { filter: storeFilter } = store
  const filter = { id: { _is_null: false } }
  const filterValues = Object.entries(storeFilter[table]).filter(
    e => e[1] || e[1] === 0,
  )
  filterValues.forEach(([key, value]) => {
    const type = types[table][key] || 'string'
    if (type === 'string') {
      filter[key] = { _ilike: `%${value}%` }
    } else {
      filter[key] = { _eq: value }
    }
  })
  return filter
}

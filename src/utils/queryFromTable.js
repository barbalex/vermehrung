import types from '../models/Filter/simpleTypes'

export default ({ store, table }) => {
  const { filter: storeFilter } = store
  //console.log('queryFromTable', { storeFilter, table })
  const filter = { id: { _is_null: false } }
  if (!storeFilter[table]) return filter
  if (!Object.entries(storeFilter[table]).length) return filter
  const filterValues = Object.entries(storeFilter[table]).filter(
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

  return filter
}

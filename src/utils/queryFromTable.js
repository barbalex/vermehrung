import types from '../store/Filter/simpleTypes'

export default ({ store, table }) => {
  const { filter: storeFilter } = store
  //console.log('queryFromTable', { storeFilter, table })
  const filter = { id: { _is_null: false } }
  const filterValues = Object.entries(storeFilter[table])
    .filter(e => e[1] || e[1] === 0)
    // ensure no '' values
    .filter(v => !!v)
  filterValues.forEach(([key, value]) => {
    const type = types[table][key] || 'string'
    if (type === 'string') {
      filter[key] = { _ilike: `%${value}%` }
    } else {
      filter[key] = { _eq: value }
    }
  })

  //console.log('queryFromTable', { filter })
  return filter
}

import types from '../models/Filter/simpleTypes'

export default ({ store, table }) => {
  const { filter: storeFilter } = store
  //console.log('queryFromTable', { storeFilter, table })

  if (!store[`${table}s`]) throw new Error(`no store found for table ${table}`)
  let filteredValues = [...store[`${table}s`].values()]
  console.log('queryFromStore', { table, filteredValues1: [...filteredValues] })

  if (!Object.entries(storeFilter[table]).length) return filteredValues
  const filterValues = Object.entries(storeFilter[table]).filter(
    (e) => e[1] || e[1] === 0,
  )
  filterValues.forEach(([key, value]) => {
    const type = types[table][key] || 'string'
    if (type === 'string') {
      filteredValues = filteredValues.filter((v) => v[key].includes(value))
    } else {
      filteredValues = filteredValues.filter((v) => (v[key] = value))
    }
  })

  return filteredValues
}

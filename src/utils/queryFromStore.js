import types from '../models/Filter/simpleTypes'

// filter is a passed filter for cases like:
// list of teilkulturs of a kultur
// > kultur_id is passed as filter
export default ({ store, table, filter = {} }) => {
  const { filter: storeFilter } = store

  if (!store[`${table}s`]) throw new Error(`no store found for table ${table}`)

  const filterValues = [
    ...Object.entries(storeFilter[table]),
    ...Object.entries(filter),
  ].filter((e) => e[1] || e[1] === 0)
  const values = [...store[`${table}s`].values()]

  if (!filterValues.length) return values

  const test = (val) => {
    const testArray = filterValues.map(([key, value]) => {
      const type = types[table][key] || 'string'
      if (type === 'string' && val[key]) {
        return val[key].includes(value)
      }
      return val[key] === value
    })
    return !testArray.includes(false)
  }

  const filteredValues = values.filter((v) => test(v))

  return filteredValues
}

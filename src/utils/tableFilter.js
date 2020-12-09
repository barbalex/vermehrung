import queryFromFilter from './queryFromFilter'

const tableFilter = ({ store, table }) => {
  const filter = store.filter[table]
  if (!filter) throw `no filter found for table ${table}`
  return queryFromFilter({
    table,
    filter: filter.toJSON(),
  })
}

export default tableFilter

import queryFromFilter from './queryFromFilter'

const tableFilter = ({ store, table }) =>
  queryFromFilter({
    table,
    filter: store.filter[table]?.toJSON(),
  })

export default tableFilter

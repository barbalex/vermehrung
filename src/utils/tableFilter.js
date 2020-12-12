import { Q } from '@nozbe/watermelondb'

import types from '../models/Filter/simpleTypes'
import exists from './exists'

const tableFilter = ({ store, table }) => {
  const filter = store.filter[table]
  if (!filter) throw `no filter found for table ${table}`

  const filterEntries = Object.entries(filter).filter(
    // eslint-disable-next-line no-unused-vars
    ([key, value]) => exists(value),
  )

  //console.log('tableFilter', { filter, table, filterEntries })

  if (!filterEntries.length) return []

  return filterEntries.map(([key, filterValue]) => {
    const type = types[table][key] || 'string'
    //console.log('tableFilter', { key, filterValue, type })
    if (type === 'string' && filterValue) {
      if (filterValue?.toString()?.toLowerCase()) {
        return Q.where(
          key,
          Q.like(
            `%${Q.sanitizeLikeString(filterValue?.toString()?.toLowerCase())}%`,
          ),
        )
      }
      return Q.where(key, Q.like(`%${Q.sanitizeLikeString(filterValue)}%`))
    }
    return Q.where(key, Q.eq(filterValue))
  })
}

export default tableFilter

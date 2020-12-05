import { Q } from '@nozbe/watermelondb'

import types from '../models/Filter/simpleTypes'
import exists from './exists'

// filter is a passed filter for cases like:
// list of teilkulturs of a kultur
// > kultur_id is passed as filter
const queryFromFilter = ({ filter, table }) => {
  const filterEntries = Object.entries(filter).filter(
    // eslint-disable-next-line no-unused-vars
    ([key, value]) => exists(value),
  )

  //console.log('queryFromFilter', { filter, table, filterEntries })

  if (!filterEntries.length) return []

  return filterEntries.map(([key, filterValue]) => {
    const type = types[table][key] || 'string'
    //console.log('queryFromFilter', { key, filterValue, type })
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

export default queryFromFilter

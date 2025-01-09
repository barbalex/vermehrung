import { Q } from '@nozbe/watermelondb'
import camelCase from 'lodash/camelCase'

import types from '../store/Filter/simpleTypes.js'
import { exists } from './exists.js'

export const tableFilter = ({ store, table }) => {
  if (!table) throw `no table passed`
  const filter = store.filter[table]
  if (!filter) throw `no filter found for table ${table}`

  const filterEntries = Object.entries(filter).filter(([key, value]) =>
    exists(value),
  )

  //console.log('tableFilter', { filter, table, filterEntries })

  if (!filterEntries.length) return []

  const filterArray = filterEntries.map(([key, filterValue]) => {
    const type = types[table][key] ?? 'string'
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

  // if a url is opened, a dataset should always show
  // even if it was filtered away
  const tableIdInActiveNodeArray =
    store[`${camelCase(table)}IdInActiveNodeArray`]
  if (tableIdInActiveNodeArray) {
    return [
      Q.or(Q.where('id', tableIdInActiveNodeArray), Q.and(...filterArray)),
    ]
  }

  return filterArray
}

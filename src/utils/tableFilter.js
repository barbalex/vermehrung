import { Q } from '@nozbe/watermelondb'
import { camelCase } from 'es-toolkit'

import {
  store,
  filterTableAtoms,
  xxxIdInActiveNodeArrayAtoms,
} from '../store/index.js'
import { simpleTypes as types } from '../store/Filter/simpleTypes.js'
import { exists } from './exists.js'

export const tableFilter = ({ table, apFilter }) => {
  if (!table) throw `no table passed`
  const filter = store.get(filterTableAtoms[table])
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

  if (apFilter) {
    filterArray.push(Q.where('apflora_ap', Q.eq(true)))
  }

  // if a url is opened, a dataset should always show
  // even if it was filtered away
  const idAtomKey = `${camelCase(table)}IdInActiveNodeArray`
  const tableIdInActiveNodeArray = xxxIdInActiveNodeArrayAtoms[idAtomKey]
    ? store.get(xxxIdInActiveNodeArrayAtoms[idAtomKey])
    : undefined
  if (tableIdInActiveNodeArray) {
    return [
      Q.or(Q.where('id', tableIdInActiveNodeArray), Q.and(...filterArray)),
    ]
  }

  return filterArray
}

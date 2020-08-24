import types from '../models/Filter/simpleTypes'
import camelCase from 'lodash/camelCase'

import aeArtSort from './aeArtSort'
import artSort from './artSort'
import avSort from './avSort'
import eventSort from './eventSort'
import fileSort from './fileSort'
import gartenSort from './gartenSort'
import gvSort from './gvSort'
import herkunftSort from './herkunftSort'
import kulturSort from './kulturSort'
import lieferungSort from './lieferungSort'
import personSort from './personSort'
import qkSort from './qkSort'
import sammlungSort from './sammlungSort'
import teilkulturSort from './teilkulturSort'
import zaehlungSort from './zaehlungSort'

const sorters = {
  ae_art: aeArtSort,
  art: artSort,
  art_file: fileSort,
  av: avSort,
  event: eventSort,
  garten: gartenSort,
  garten_file: fileSort,
  gv: gvSort,
  herkunft: herkunftSort,
  kultur: kulturSort,
  lieferung: lieferungSort,
  lieferung_file: fileSort,
  person: personSort,
  person_file: fileSort,
  qk: qkSort,
  sammel_lieferung: lieferungSort,
  sammlung: sammlungSort,
  sammlung_file: fileSort,
  teilkultur: teilkulturSort,
  zaehlung: zaehlungSort,
}
const nonSorter = () => true

// filter is a passed filter for cases like:
// list of teilkulturs of a kultur
// > kultur_id is passed as filter
export default ({ store, table }) => {
  const { filter: storeFilter } = store
  const viewName = `${camelCase(table)}sSorted`

  if (!store[viewName]) {
    throw new Error(`no sorted view found for table ${table}`)
  }

  const filterValues = Object.entries(storeFilter[table]).filter(
    (e) => !!e?.[1] || e?.[1] === false,
  )
  const values = [...store[viewName].values()]

  if (!filterValues.length) return values

  const test = (val) => {
    const testArray = filterValues.map(([key, filterValue]) => {
      const type = types[table][key] || 'string'
      const value = val[key]
      if (type === 'string' && value) {
        if (
          value?.toString()?.toLowerCase() &&
          filterValue?.toString()?.toLowerCase()
        ) {
          return value
            .toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        }
        return value.includes(filterValue)
      }
      return value === filterValue
    })

    return !testArray.includes(false)
  }

  const filteredValues = values.filter(test)

  const sortFunction = sorters[table] ?? nonSorter
  return filteredValues.sort(sortFunction)
}

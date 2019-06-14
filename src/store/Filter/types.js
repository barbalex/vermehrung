import { types } from 'mobx-state-tree'

import { type as art } from './art'
import { type as event } from './event'
import { type as garten } from './garten'
import { type as herkunft } from './herkunft'
import { type as kultur } from './kultur'
import { type as kultur_zaehlung_felder } from './kultur_zaehlung_felder'
import { type as lieferung } from './lieferung'
import { type as person } from './person'
import { type as sammlung } from './sammlung'
import { type as zaehlung } from './zaehlung'
import { type as teilzaehlung } from './teilzaehlung'
import initialValues from './initialValues'

export default types
  .model({
    show: types.optional(types.boolean, false),
    art,
    event,
    garten,
    herkunft,
    kultur,
    kultur_zaehlung_felder,
    lieferung,
    person,
    sammlung,
    zaehlung,
    teilzaehlung,
  })
  .actions(self => ({
    setValue({ table, key, value }) {
      self[table][key] = value
    },
    empty() {
      // maybe loop all keys and set values?
      Object.keys(self)
        .filter(k => k !== 'show')
        .forEach(key => (self[key] = initialValues[key]))
    },
    emptyTable({ table }) {
      self[table] = initialValues[table]
    },
    tableIsFiltered({ table }) {
      return (
        Object.values(self[table] || {}).filter(v => v || v === 0).length > 0
      )
    },
    isFiltered() {
      // DO NOT USE VIEW, THE RESULT WILL BE WRONG!!!!
      const tables = Object.keys(self).filter(t => t !== 'show')
      return tables.some(table => self.tableIsFiltered({ table }))
    },
    setShow(val) {
      self.show = val
    },
  }))

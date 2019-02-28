import { types } from 'mobx-state-tree'

import { type as art } from './art'
import { type as event } from './event'
import { type as garten } from './garten'
import { type as herkunft } from './herkunft'
import { type as inventar } from './inventar'
import { type as kultur } from './kultur'
import { type as lieferung } from './lieferung'
import { type as person } from './person'
import { type as sammlung } from './sammlung'
import { type as zaehlung } from './zaehlung'
import initialValues from './initialValues'

export default types
  .model({
    show: types.optional(types.boolean, false),
    art,
    event,
    garten,
    herkunft,
    inventar,
    kultur,
    lieferung,
    person,
    sammlung,
    zaehlung,
  })
  .actions(self => ({
    setValue({ table, key, value }) {
      self[table][key] = value
    },
    empty() {
      // maybe loop all keys and set values?
      self = initialValues
    },
    emptyTable({ table }) {
      self[table] = initialValues[table]
    },
    tableIsFiltered({ table }) {
      return (
        Object.values(self[table] || []).filter(v => v || v === 0).length > 0
      )
    },
    isFiltered() {
      const tables = Object.keys(self).filter(t => t !== 'show')
      return tables.some(table => self.tableIsFiltered({ table }))
    },
    setShow(val) {
      self.show = val
    },
  }))

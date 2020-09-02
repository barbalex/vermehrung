import { types, getParent } from 'mobx-state-tree'

import { type as art } from './art'
import { type as event } from './event'
import { type as garten } from './garten'
import { type as herkunft } from './herkunft'
import { type as kultur } from './kultur'
import { type as kultur_option } from './kultur_option'
import { type as lieferung } from './lieferung'
import { type as sammel_lieferung } from './sammel_lieferung'
import { type as person } from './person'
import { type as sammlung } from './sammlung'
import { type as zaehlung } from './zaehlung'
import { type as teilkultur } from './teilkultur'
import { type as teilzaehlung } from './teilzaehlung'
import emptyValues from './emptyValues'

export default types
  .model({
    show: types.optional(types.boolean, false),
    art,
    event,
    garten,
    herkunft,
    kultur,
    kultur_option,
    lieferung,
    sammel_lieferung,
    person,
    sammlung,
    zaehlung,
    teilzaehlung,
    teilkultur,
  })
  .actions((self) => ({
    setValue({ table, key, value }) {
      self[table][key] = value
    },
    empty() {
      // maybe loop all keys and set values?
      Object.keys(self)
        .filter((k) => !!k)
        .filter((k) => k !== 'show')
        .forEach((key) => {
          self[key] = emptyValues[key]
        })
    },
    emptyTable({ table }) {
      self[table] = emptyValues[table]
    },
    tableIsFiltered({ table }) {
      return (
        Object.values(self[table] || {}).filter((v) => v || v === 0).length > 0
      )
    },
    isFiltered() {
      // DO NOT USE VIEW, THE RESULT WILL BE WRONG!!!!
      const tables = Object.keys(self).filter((t) => t !== 'show')
      return tables.some((table) => self.tableIsFiltered({ table }))
    },
    setShow(val) {
      self.show = val
    },
  }))

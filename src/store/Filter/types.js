import { types } from 'mobx-state-tree'
import { type as art, empty as art_empty } from './art.js'
import { type as event, empty as event_empty } from './event.js'
import { type as garten, empty as garten_empty } from './garten.js'
import { type as herkunft, empty as herkunft_empty } from './herkunft.js'
import { type as kultur, empty as kultur_empty } from './kultur.js'
import {
  type as kultur_option,
  empty as kultur_option_empty,
} from './kultur_option.js'
import { type as lieferung, empty as lieferung_empty } from './lieferung.js'
import {
  type as sammel_lieferung,
  empty as sammel_lieferung_empty,
} from './sammel_lieferung.js'
import { type as person, empty as person_empty } from './person.js'
import { type as sammlung, empty as sammlung_empty } from './sammlung.js'
import { type as zaehlung, empty as zaehlung_empty } from './zaehlung.js'
import { type as teilkultur, empty as teilkultur_empty } from './teilkultur.js'
import {
  type as teilzaehlung,
  empty as teilzaehlung_empty,
} from './teilzaehlung.js'
import emptyValues from './emptyValues.js'

const emptyHash = {
  art: art_empty,
  event: event_empty,
  garten: garten_empty,
  herkunft: herkunft_empty,
  kultur: kultur_empty,
  kultur_option: kultur_option_empty,
  lieferung: lieferung_empty,
  sammel_lieferung: sammel_lieferung_empty,
  person: person_empty,
  sammlung: sammlung_empty,
  zaehlung: zaehlung_empty,
  teilkultur: teilkultur_empty,
  teilzaehlung: teilzaehlung_empty,
}

export const Filter = types
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
      const empty = emptyHash[table]
      return Object.entries(self[table]).some(
        ([key, value]) => value !== empty[key],
      )
    },
    setShow(val) {
      self.show = val
    },
  }))
  .views((self) => ({
    get filtered() {
      const tables = Object.keys(self).filter((t) => t !== 'show')
      return tables.some((table) => {
        const empty = emptyHash[table]
        return Object.entries(self[table]).some(
          ([key, value]) => value !== empty[key],
        )
      })
    },
  }))

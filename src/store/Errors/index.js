import { types } from 'mobx-state-tree'

import { type as art } from './art.js'
import { type as event } from './event.js'
import { type as garten } from './garten.js'
import { type as herkunft } from './herkunft.js'
import { type as kultur } from './kultur.js'
import { type as lieferung } from './lieferung.js'
import { type as person } from './person.js'
import { type as sammel_lieferung } from './sammel_lieferung.js'
import { type as sammlung } from './sammlung.js'
import { type as teilkultur } from './teilkultur.js'
import { type as teilzaehlung } from './teilzaehlung.js'
import { type as zaehlung } from './zaehlung.js'

/**
 * structure: error.table.field
 * need this because operations work on top level
 * so errors need to be managed there too
 */
export const Errors = types.model('Errors', {
  art: art,
  event: event,
  garten: garten,
  herkunft: herkunft,
  kultur: kultur,
  lieferung: lieferung,
  person: person,
  sammel_lieferung: sammel_lieferung,
  sammlung: sammlung,
  teilkultur: teilkultur,
  teilzaehlung: teilzaehlung,
  zaehlung: zaehlung,
})

export const defaultValue = {
  art: {},
  event: {},
  garten: {},
  herkunft: {},
  kultur: {},
  lieferung: {},
  person: {},
  sammel_lieferung: {},
  sammlung: {},
  teilkultur: {},
  teilzaehlung: {},
  zaehlung: {},
}

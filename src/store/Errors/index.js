import { types } from 'mobx-state-tree'

import { type as art } from './art'
import { type as event } from './event'
import { type as garten } from './garten'
import { type as herkunft } from './herkunft'
import { type as kultur } from './kultur'
import { type as lieferung } from './lieferung'
import { type as person } from './person'
import { type as sammel_lieferung } from './sammel_lieferung'
import { type as sammlung } from './sammlung'
import { type as teilkultur } from './teilkultur'
import { type as teilzaehlung } from './teilzaehlung'
import { type as zaehlung } from './zaehlung'

/**
 * structure: error.table.field
 * need this because operations work on top level
 * so errors need to be managed there too
 */
const model = types.model('Errors', {
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

export default model

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

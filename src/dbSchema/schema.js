import { appSchema } from '@nozbe/watermelondb'

import ae_art from './ae_art'
import art from './art'
import av from './av'
import event from './event'
import garten from './garten'
import gv from './gv'
import herkunft from './herkunft'
import kultur from './kultur'
import lieferung from './lieferung'
import person from './person'
import sammel_lieferung from './sammel_lieferung'
import sammlung from './sammlung'
import teilkultur from './teilkultur'
import teilzaehlung from './teilzaehlung'
import zaehlung from './zaehlung'

export const tables = [
  ae_art,
  art,
  av,
  event,
  garten,
  gv,
  herkunft,
  kultur,
  lieferung,
  person,
  sammel_lieferung,
  sammlung,
  teilkultur,
  teilzaehlung,
  zaehlung,
]

export default appSchema({
  version: 1,
  tables,
})

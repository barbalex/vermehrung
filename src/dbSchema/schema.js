import { appSchema } from '@nozbe/watermelondb'

import ae_art from './ae_art'
import art from './art'
import art_file from './art_file'
import av from './av'
import event from './event'
import garten from './garten'
import garten_file from './garten_file'
import gv from './gv'
import herkunft from './herkunft'
import herkunft_file from './herkunft_file'
import kultur from './kultur'
import kultur_file from './kultur_file'
import lieferung from './lieferung'
import lieferung_file from './lieferung_file'
import person from './person'
import person_file from './person_file'
import sammel_lieferung from './sammel_lieferung'
import sammlung from './sammlung'
import sammlung_file from './sammlung_file'
import teilkultur from './teilkultur'
import teilzaehlung from './teilzaehlung'
import zaehlung from './zaehlung'

export const tables = [
  ae_art,
  art,
  art_file,
  av,
  event,
  garten,
  garten_file,
  gv,
  herkunft,
  herkunft_file,
  kultur,
  kultur_file,
  lieferung,
  lieferung_file,
  person,
  person_file,
  sammel_lieferung,
  sammlung,
  sammlung_file,
  teilkultur,
  teilzaehlung,
  zaehlung,
]

export default appSchema({
  version: 1,
  tables,
})

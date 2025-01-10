import { appSchema } from '@nozbe/watermelondb'

import ae_art from './ae_art.js'
import art from './art.js'
import art_file from './art_file.js'
import art_qk from './art_qk.js'
import av from './av.js'
import event from './event.js'
import garten from './garten.js'
import garten_file from './garten_file.js'
import gv from './gv.js'
import herkunft from './herkunft.js'
import herkunft_file from './herkunft_file'
import kultur from './kultur'
import kultur_file from './kultur_file'
import kultur_option from './kultur_option'
import kultur_qk from './kultur_qk'
import lieferung from './lieferung'
import lieferung_file from './lieferung_file'
import person from './person'
import person_file from './person_file'
import person_option from './person_option'
import sammel_lieferung from './sammel_lieferung'
import sammlung from './sammlung'
import sammlung_file from './sammlung_file'
import teilkultur from './teilkultur'
import teilzaehlung from './teilzaehlung'
import user_role from './user_role'
import zaehlung from './zaehlung'

export const tables = [
  ae_art,
  art,
  art_file,
  art_qk,
  av,
  event,
  garten,
  garten_file,
  gv,
  herkunft,
  herkunft_file,
  kultur,
  kultur_file,
  kultur_option,
  kultur_qk,
  lieferung,
  lieferung_file,
  person,
  person_file,
  sammel_lieferung,
  person_option,
  sammlung,
  sammlung_file,
  teilkultur,
  teilzaehlung,
  user_role,
  zaehlung,
]

export const schema = appSchema({
  version: 4,
  tables,
})

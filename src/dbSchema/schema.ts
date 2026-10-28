import { appSchema } from '@nozbe/watermelondb'

import { ae_art } from './ae_art.ts'
import { apflora_ap } from './apflora_ap.ts'
import { art } from './art.ts'
import { art_file } from './art_file.ts'
import { art_qk } from './art_qk.ts'
import { av } from './av.ts'
import { bedarf } from './bedarf.ts'
import { event } from './event.ts'
import { garten } from './garten.ts'
import { garten_file } from './garten_file.ts'
import { gv } from './gv.ts'
import { herkunft } from './herkunft.ts'
import { herkunft_file } from './herkunft_file.ts'
import { kultur } from './kultur.ts'
import { kultur_file } from './kultur_file.ts'
import { kultur_option } from './kultur_option.ts'
import { kultur_qk } from './kultur_qk.ts'
import { lieferung } from './lieferung.ts'
import { lieferung_file } from './lieferung_file.ts'
import { person } from './person.ts'
import { person_file } from './person_file.ts'
import { person_option } from './person_option.ts'
import { sammel_lieferung } from './sammel_lieferung.ts'
import { sammlung } from './sammlung.ts'
import { sammlung_file } from './sammlung_file.ts'
import { teilkultur } from './teilkultur.ts'
import { teilzaehlung } from './teilzaehlung.ts'
import { user_role } from './user_role.ts'
import { zaehlung } from './zaehlung.ts'

export const tables = [
  ae_art,
  apflora_ap,
  art,
  art_file,
  art_qk,
  av,
  bedarf,
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
  version: 9,
  tables,
})

import { initial as art } from './art.ts'
import { initial as bedarf } from './bedarf.ts'
import { initial as event } from './event.ts'
import { initial as garten } from './garten.ts'
import { initial as herkunft } from './herkunft.ts'
import { initial as kultur } from './kultur.ts'
import { initial as kultur_option } from './kultur_option.ts'
import { initial as lieferung } from './lieferung.ts'
import { initial as sammel_lieferung } from './sammel_lieferung.ts'
import { initial as person } from './person.ts'
import { initial as sammlung } from './sammlung.ts'
import { initial as zaehlung } from './zaehlung.ts'
import { initial as teilkultur } from './teilkultur.ts'
import { initial as teilzaehlung } from './teilzaehlung.ts'

export const initialFilterValues: Record<string, Record<string, unknown>> = {
  art,
  bedarf,
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
  teilkultur,
  teilzaehlung,
}

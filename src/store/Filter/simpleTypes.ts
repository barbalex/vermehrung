import { simpleTypes as art } from './art.ts'
import { simpleTypes as bedarf } from './bedarf.ts'
import { simpleTypes as event } from './event.ts'
import { simpleTypes as garten } from './garten.ts'
import { simpleTypes as herkunft } from './herkunft.ts'
import { simpleTypes as kultur } from './kultur.ts'
import { simpleTypes as lieferung } from './lieferung.ts'
import { simpleTypes as sammel_lieferung } from './sammel_lieferung.ts'
import { simpleTypes as person } from './person.ts'
import { simpleTypes as sammlung } from './sammlung.ts'
import { simpleTypes as zaehlung } from './zaehlung.ts'
import { simpleTypes as teilkultur } from './teilkultur.ts'
import { simpleTypes as teilzaehlung } from './teilzaehlung.ts'

export const simpleTypes: Record<string, Record<string, string>> = {
  art,
  bedarf,
  event,
  garten,
  herkunft,
  kultur,
  lieferung,
  sammel_lieferung,
  person,
  sammlung,
  zaehlung,
  teilkultur,
  teilzaehlung,
}

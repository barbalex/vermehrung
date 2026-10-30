import { empty as art } from './art.ts'
import { empty as bedarf } from './bedarf.ts'
import { empty as garten } from './garten.ts'
import { empty as herkunft } from './herkunft.ts'
import { empty as kultur } from './kultur.ts'
import { empty as kultur_option } from './kultur_option.ts'
import { empty as lieferung } from './lieferung.ts'
import { empty as sammel_lieferung } from './sammel_lieferung.ts'
import { empty as person } from './person.ts'
import { empty as sammlung } from './sammlung.ts'
import { empty as zaehlung } from './zaehlung.ts'
import { empty as teilkultur } from './teilkultur.ts'
import { empty as teilzaehlung } from './teilzaehlung.ts'

const emptyValues: Record<string, Record<string, unknown>> = {
  art,
  bedarf,
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

export default emptyValues

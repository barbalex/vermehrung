import { personFullname } from './personFullname.ts'
import type { GartenRow, PersonRow } from './rowTypes.ts'

export const gartenLabelFromGarten = ({
  garten,
  person,
  kein,
}: {
  garten: GartenRow
  person: PersonRow
  kein?: string
}) => {
  if (!garten?.id) return 'kein Garten'
  if (garten?.name) return garten.name
  if (person) {
    const fullname = personFullname(person)
    if (fullname) return fullname
  }

  return kein ?? 'kein Name'
}

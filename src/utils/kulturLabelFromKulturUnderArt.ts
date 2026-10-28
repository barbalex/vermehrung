import { personFullname } from './personFullname.ts'
import type { GartenRow, HerkunftRow, KulturRow, PersonRow } from './rowTypes.ts'

export const kulturLabelFromKulturUnderArt = ({
  kultur,
  garten,
  gartenPerson,
  herkunft,
}: {
  kultur: KulturRow
  garten: GartenRow
  gartenPerson: PersonRow
  herkunft: HerkunftRow
}) => {
  if (!kultur) return ''

  let gartenLabel = 'in: kein Garten'
  if (kultur.garten_id) {
    gartenLabel = 'in: Garten ohne Name'
  }
  if (garten?.name) {
    gartenLabel = `in: ${garten.name}`
  }
  if (!garten?.name && garten?.person_id) {
    const fullname = personFullname(gartenPerson)
    if (gartenPerson && fullname) {
      gartenLabel = `in: ${fullname}'s Garten`
    }
  }

  let herkunftLabel = 'von: keine Herkunft'
  if (kultur.herkunft_id) {
    if (herkunft?.nr) {
      herkunftLabel = `von: ${herkunft.nr}`
    } else {
      herkunftLabel = 'von: (Herkunft ohne Nr)'
    }
  }
  const zwischenlagerLabel = kultur?.zwischenlager ? 'Zwischenlager' : undefined
  const label = [herkunftLabel, gartenLabel, zwischenlagerLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}

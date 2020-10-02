import herkunftLabelFromHerkunft from '../../../utils/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../../../utils/gartenLabelFromGarten'
import artLabelFromKultur from '../../../utils/artLabelFromKultur'

const createDataArrayForRevComparison = ({ row, revRow, store }) => [
  {
    valueInRow: artLabelFromKultur({ kultur: row, store }),
    valueInRev: artLabelFromKultur({ kultur: revRow, store }),
    label: 'Art',
  },
  {
    valueInRow: herkunftLabelFromHerkunft({ herkunft: row }),
    valueInRev: herkunftLabelFromHerkunft({ herkunft: revRow }),
    label: 'Herkunft',
  },
  { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
  {
    valueInRow: gartenLabelFromGarten({ garten: row, store }),
    valueInRev: gartenLabelFromGarten({ garten: revRow, store }),
    label: 'Garten',
  },
  {
    valueInRow: row?.zwischenlager == true,
    valueInRev: revRow?.zwischenlager == true,
    label: 'Zwischenlager',
  },
  {
    valueInRow: row?.erhaltungskultur == true,
    valueInRev: revRow?.erhaltungskultur == true,
    label: 'Erhaltungskultur',
  },
  {
    valueInRow: row?.von_anzahl_individuen,
    valueInRev: revRow?.von_anzahl_individuen,
    label: 'Von Anzahl Individuen',
  },
  {
    valueInRow: row?.bemerkungen,
    valueInRev: revRow?.bemerkungen,
    label: 'bemerkungen',
  },
  {
    valueInRow: row?.aktiv == true,
    valueInRev: revRow?.aktiv == true,
    label: 'aktiv',
  },
  {
    valueInRow: row?.changed,
    valueInRev: revRow?.changed,
    label: 'geändert',
  },
  {
    valueInRow: row?.changed_by,
    valueInRev: revRow?.changed_by,
    label: 'geändert von',
  },
  {
    valueInRow: row._deleted,
    valueInRev: revRow._deleted,
    label: 'gelöscht',
  },
]

export default createDataArrayForRevComparison

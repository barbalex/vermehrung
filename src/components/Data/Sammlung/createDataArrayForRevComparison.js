import moment from 'moment'

import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'

const createDataArrayForRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row?.art?.art_ae_art?.name,
    valueInRev: revRow?.art?.art_ae_art?.name,
    label: 'Art',
  },
  {
    valueInRow: row?.person?.fullname,
    valueInRev: revRow?.person?.fullname,
    label: 'Person',
  },
  {
    valueInRow: herkunftLabelFromHerkunft(row.herkunft),
    valueInRev: herkunftLabelFromHerkunft(revRow.herkunft),
    label: 'Herkunft',
  },
  {
    valueInRow: row?.nr,
    valueInRev: revRow?.nr,
    label: 'Nr',
  },
  {
    valueInRow: moment(row?.datum).format('DD.MM.YYYY'),
    valueInRev: moment(revRow?.datum).format('DD.MM.YYYY'),
    label: 'Datum',
  },
  {
    valueInRow: row?.von_anzahl_individuen,
    valueInRev: revRow?.von_anzahl_individuen,
    label: 'Von Anzahl Individuen',
  },
  {
    valueInRow: row?.anzahl_pflanzen,
    valueInRev: revRow?.anzahl_pflanzen,
    label: 'Anzahl Pflanzen',
  },
  {
    valueInRow: row?.gramm_samen,
    valueInRev: revRow?.gramm_samen,
    label: 'Gramm Samen',
  },
  {
    valueInRow: row?.andere_menge,
    valueInRev: revRow?.andere_menge,
    label: 'Andere Menge',
  },
  {
    valueInRow: row?.geom_point?.coordinates,
    valueInRev: revRow?.geom_point?.coordinates,
    label: 'Längen- und Breitengrad',
  },
  {
    valueInRow: row?.geplant == true,
    valueInRev: revRow?.geplant == true,
    label: 'geplant',
  },
  {
    valueInRow: row?.bemerkungen,
    valueInRev: revRow?.bemerkungen,
    label: 'bemerkungen',
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
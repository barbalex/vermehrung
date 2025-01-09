import { DateTime } from 'luxon'

export const createDataArrayForSammlungRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.art_id,
    valueInRev: revRow.art_id,
    label: 'Art (id)',
  },
  {
    valueInRow: row.person_id,
    valueInRev: revRow.person_id,
    label: 'Person (id)',
  },
  {
    valueInRow: row.herkunft_id,
    valueInRev: revRow.herkunft_id,
    label: 'Herkunft (id)',
  },
  {
    valueInRow: row?.nr,
    valueInRev: revRow?.nr,
    label: 'Nr',
  },
  {
    valueInRow:
      row?.datum ? DateTime.fromSQL(row.datum).toFormat('dd.LL.yyyy') : '',
    valueInRev:
      revRow?.datum ?
        DateTime.fromSQL(revRow.datum).toFormat('dd.LL.yyyy')
      : '',
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

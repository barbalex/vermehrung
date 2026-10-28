import { DateTime } from 'luxon'

export const createDataArrayForSammellieferungRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.art_id,
    valueInRev: revRow.art_id,
    label: 'Art (id)',
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
    valueInRow: row?.anzahl_auspflanzbereit,
    valueInRev: revRow?.anzahl_auspflanzbereit,
    label: 'Anzahl ausfplanzbereit',
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
    valueInRow: row.person_id,
    valueInRev: revRow.person_id,
    label: 'Person (id)',
  },
  {
    valueInRow: row.von_sammlung_id,
    valueInRev: revRow.von_sammlung_id,
    label: 'Von Sammlung (id)',
  },
  {
    valueInRow: row.von_kultur_id,
    valueInRev: revRow.von_kultur_id,
    label: 'Von Kultur (id)',
  },
  {
    valueInRow: row?.datum
      ? DateTime.fromSQL(row.datum).toFormat('dd.LL.yyyy')
      : null,
    valueInRev: revRow?.datum
      ? DateTime.fromSQL(revRow.datum).toFormat('dd.LL.yyyy')
      : null,
    label: 'Datum',
  },
  {
    valueInRow: row.nach_kultur_id,
    valueInRev: revRow.nach_kultur_id,
    label: 'Nach Kultur (id)',
  },
  {
    valueInRow: row?.nach_ausgepflanzt == true,
    valueInRev: revRow?.nach_ausgepflanzt == true,
    label: 'Nach ausgepflanzt',
  },
  {
    valueInRow: row?.geplant == true,
    valueInRev: revRow?.geplant == true,
    label: 'geplant',
  },
  {
    valueInRow: row?.bemerkungen,
    valueInRev: revRow?.bemerkungen,
    label: 'Bemerkungen',
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


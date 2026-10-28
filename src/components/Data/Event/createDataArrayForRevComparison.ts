export const createDataArrayForEventRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.kultur_id,
    valueInRev: revRow.kultur_id,
    label: 'Kultur (id)',
  },
  {
    valueInRow: row.teilkultur_id,
    valueInRev: revRow.teilkultur_id,
    label: 'Teilkultur (id)',
  },
  {
    valueInRow: row.person_id,
    valueInRev: revRow.person_id,
    label: 'Person (id)',
  },
  {
    valueInRow: row?.beschreibung,
    valueInRev: revRow?.beschreibung,
    label: 'Beschreibung',
  },
  {
    valueInRow: row?.geplant == true,
    valueInRev: revRow?.geplant == true,
    label: 'geplant',
  },
  {
    valueInRow: row.datum,
    valueInRev: revRow.datum,
    label: 'Datum',
  },
  {
    valueInRow: row.changed,
    valueInRev: revRow.changed,
    label: 'geändert',
  },
  {
    valueInRow: row.changed_by,
    valueInRev: revRow.changed_by,
    label: 'geändert von',
  },
  {
    valueInRow: row._deleted,
    valueInRev: revRow._deleted,
    label: 'gelöscht',
  },
]

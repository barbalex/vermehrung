export const createDataArrayForGartenRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row?.name,
    valueInRev: revRow?.name,
    label: 'Name',
  },
  {
    valueInRow: row.person_id,
    valueInRev: revRow.person_id,
    label: 'Person (id)',
  },
  { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
  {
    valueInRow: row?.plz,
    valueInRev: revRow?.plz,
    label: 'PLZ',
  },
  { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
  {
    valueInRow: row?.geom_point?.coordinates,
    valueInRev: revRow?.geom_point?.coordinates,
    label: 'Längen- und Breitengrad',
  },
  {
    valueInRow: row?.aktiv == true,
    valueInRev: revRow?.aktiv == true,
    label: 'aktiv',
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

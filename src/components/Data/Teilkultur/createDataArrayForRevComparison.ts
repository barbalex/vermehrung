export const createDataArrayForTeilkulturRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.kultur_id,
    valueInRev: revRow.kultur_id,
    label: 'Kultur (id)',
  },
  {
    valueInRow: row?.name,
    valueInRev: revRow?.name,
    label: 'Name',
  },
  { valueInRow: row?.ort1, valueInRev: revRow?.ort1, label: 'Ort 1' },
  {
    valueInRow: row?.ort2,
    valueInRev: revRow?.ort2,
    label: 'Ort 2',
  },
  { valueInRow: row?.ort3, valueInRev: revRow?.ort3, label: 'Ort 3' },
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

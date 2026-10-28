export const createDataArrayForHerkunftRevComparison = ({ row, revRow }) => [
  { valueInRow: row?.nr, valueInRev: revRow?.nr, label: 'Nr' },
  {
    valueInRow: row?.lokalname,
    valueInRev: revRow?.lokalname,
    label: 'Lokalname',
  },
  {
    valueInRow: row?.gemeinde,
    valueInRev: revRow?.gemeinde,
    label: 'Gemeinde',
  },
  { valueInRow: row?.kanton, valueInRev: revRow?.kanton, label: 'Kanton' },
  { valueInRow: row?.land, valueInRev: revRow?.land, label: 'Land' },
  {
    valueInRow: row?.geom_point?.coordinates,
    valueInRev: revRow?.geom_point?.coordinates,
    label: 'Längen- und Breitengrad',
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

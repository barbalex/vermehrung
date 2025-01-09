export const createDataArrayForKulturRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.art_id,
    valueInRev: revRow.art_id,
    label: 'Art (id)',
  },
  {
    valueInRow: row.herkunft_id,
    valueInRev: revRow.herkunft_id,
    label: 'Herkunft (id)',
  },
  { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
  {
    valueInRow: row.garten_id,
    valueInRev: revRow.garten_id,
    label: 'Garten (id)',
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


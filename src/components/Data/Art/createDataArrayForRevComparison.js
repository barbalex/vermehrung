const createDataArrayForRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row?.art_ae_art?.name, // this is key in row
    valueInRev: revRow?.art_rev_ae_art?.name, // this is key in rev
    label: 'Art',
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
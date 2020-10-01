import artLabelFromArt from '../../../utils/artLabelFromArt'

const createDataArrayForRevComparison = ({ row, revRow, store }) => [
  {
    valueInRow: artLabelFromArt({ art: row, store }),
    valueInRev: artLabelFromArt({
      art: revRow,
      store,
    }),
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

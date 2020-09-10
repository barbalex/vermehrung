import moment from 'moment'

import kulturLabelFromKultur from './kulturLabelFromKultur'

const createDataArrayForRevComparison = ({ row, revRow }) => [
  {
    valueInRow: kulturLabelFromKultur(row),
    valueInRev: kulturLabelFromKultur(revRow),
    label: 'Kultur',
  },
  {
    valueInRow: row?.datum ? moment(row.datum).format('DD.MM.YYYY') : null,
    valueInRev: revRow?.datum
      ? moment(revRow.datum).format('DD.MM.YYYY')
      : null,
    label: 'Datum',
  },
  {
    valueInRow: row?.prognose == true,
    valueInRev: revRow?.prognose == true,
    label: 'Prognose',
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

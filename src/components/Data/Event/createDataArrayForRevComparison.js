import kulturLabelFromKultur from '../../../utils/kulturLabelFromKultur'

const createDataArrayForRevComparison = ({ row, revRow, store }) => [
  {
    valueInRow: kulturLabelFromKultur({ kultur: row?.kultur, store }),
    valueInRev: kulturLabelFromKultur({ kultur: revRow?.kultur, store }),
    label: 'Kultur',
  },
  {
    valueInRow: row?.teilkultur?.name,
    valueInRev: revRow?.teilkultur?.name,
    label: 'Teilkultur',
  },
  {
    valueInRow: row?.person?.fullname,
    valueInRev: revRow?.person?.fullname,
    label: 'Person',
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

export default createDataArrayForRevComparison

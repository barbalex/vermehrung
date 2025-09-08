import { DateTime } from 'luxon'

export const createDataArrayForZaehlungRevComparison = ({ row, revRow }) => [
  {
    valueInRow: row.kultur_id,
    valueInRev: revRow.kultur_id,
    label: 'Kultur (id)',
  },
  {
    valueInRow:
      row?.datum ? DateTime.fromSQL(row.datum).toFormat('dd.LL.yyyy') : null,
    valueInRev:
      revRow?.datum ?
        DateTime.fromSQL(revRow.datum).toFormat('dd.LL.yyyy')
      : null,
    label: 'Datum',
  },
  {
    valueInRow: row?.bedarf == true,
    valueInRev: revRow?.bedarf == true,
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

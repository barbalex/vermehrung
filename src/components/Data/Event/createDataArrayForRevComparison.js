import kulturLabelFromKultur from '../../../utils/kulturLabelFromKultur'
import teilkulturLabelFromTeilkultur from '../../../utils/teilkulturLabelFromTeilkultur'

const createDataArrayForRevComparison = ({ row, revRow, store }) => {
  const rowKultur = row.kultur_id ? store.kulturs.get(row.kultur_id) : {}
  const revRowKultur = revRow.kultur_id
    ? store.kulturs.get(revRow.kultur_id)
    : {}
  const rowTeilkultur = row.teilkultur_id
    ? store.teilkulturs.get(row.teilkultur_id)
    : {}
  const revRowTeilkultur = revRow.teilkultur_id
    ? store.teilkulturs.get(revRow.teilkultur_id)
    : {}
  const rowPerson = row.person_id ? store.persons.get(row.person_id) : {}
  const revRowPerson = revRow.person_id
    ? store.persons.get(revRow.person_id)
    : {}

  return [
    {
      valueInRow: kulturLabelFromKultur({ kultur: rowKultur, store }),
      valueInRev: kulturLabelFromKultur({ kultur: revRowKultur, store }),
      label: 'Kultur',
    },
    {
      valueInRow: teilkulturLabelFromTeilkultur({ teilkultur: rowTeilkultur }),
      valueInRev: teilkulturLabelFromTeilkultur({
        teilkultur: revRowTeilkultur,
      }),
      label: 'Teilkultur',
    },
    {
      valueInRow: rowPerson?.fullname,
      valueInRev: revRowPerson?.fullname,
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
}

export default createDataArrayForRevComparison

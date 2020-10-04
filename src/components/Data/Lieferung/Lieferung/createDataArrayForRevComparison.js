import { DateTime } from 'luxon'

import kulturLabelFromKultur from '../../../../utils/kulturLabelFromKultur'
import artLabelFromLieferung from '../../../../utils/artLabelFromLieferung'
import sammlungLabelFromSammlung from './sammlungLabelFromSammlung'

const createDataArrayForRevComparison = ({ row, revRow, store }) => {
  const rowPerson = row?.person_id ? store.persons.get(row.person_id) : {}
  const revRowPerson = revRow?.person_id
    ? store.persons.get(revRow.person_id)
    : {}
  const rowSammlung = row?.von_sammlung_id
    ? store.sammlungs.get(row.von_sammlung_id)
    : {}
  const revRowSammlung = revRow?.von_sammlung_id
    ? store.sammlungs.get(revRow.von_sammlung_id)
    : {}
  const rowVonKultur = row?.von_kultur_id
    ? store.kulturs.get(row.von_kultur_id)
    : {}
  const revRowVonKultur = revRow?.von_kultur_id
    ? store.kulturs.get(revRow.von_kultur_id)
    : {}
  const rowNachKultur = row?.nach_kultur_id
    ? store.kulturs.get(row.nach_kultur_id)
    : {}
  const revRowNachKultur = revRow?.nach_kultur_id
    ? store.kulturs.get(revRow.nach_kultur_id)
    : {}

  return [
    {
      valueInRow: artLabelFromLieferung({ lieferung: row, store }),
      valueInRev: artLabelFromLieferung({ lieferung: revRow, store }),
      label: 'Art',
    },
    {
      valueInRow: row?.von_anzahl_individuen,
      valueInRev: revRow?.von_anzahl_individuen,
      label: 'Von Anzahl Individuen',
    },
    {
      valueInRow: row?.anzahl_pflanzen,
      valueInRev: revRow?.anzahl_pflanzen,
      label: 'Anzahl Pflanzen',
    },
    {
      valueInRow: row?.anzahl_auspflanzbereit,
      valueInRev: revRow?.anzahl_auspflanzbereit,
      label: 'Anzahl ausfplanzbereit',
    },
    {
      valueInRow: row?.gramm_samen,
      valueInRev: revRow?.gramm_samen,
      label: 'Gramm Samen',
    },
    {
      valueInRow: row?.andere_menge,
      valueInRev: revRow?.andere_menge,
      label: 'Andere Menge',
    },
    {
      valueInRow: rowPerson?.fullname,
      valueInRev: revRowPerson?.fullname,
      label: 'Person',
    },
    {
      valueInRow: sammlungLabelFromSammlung({ sammlung: rowSammlung, store }),
      valueInRev: sammlungLabelFromSammlung({
        sammlung: revRowSammlung,
        store,
      }),
      label: 'Von Sammlung',
    },
    {
      valueInRow: kulturLabelFromKultur({
        kultur: rowVonKultur,
        store,
      }),
      valueInRev: kulturLabelFromKultur({
        kultur: revRowVonKultur,
        store,
      }),
      label: 'Von Kultur',
    },
    {
      valueInRow: row?.datum
        ? DateTime.fromSQL(row.datum).toFormat('dd.LL.yyyy')
        : null,
      valueInRev: revRow?.datum
        ? DateTime.fromSQL(revRow.datum).toFormat('dd.LL.yyyy')
        : null,
      label: 'Datum',
    },
    {
      valueInRow: kulturLabelFromKultur({
        kultur: rowNachKultur,
        store,
      }),
      valueInRev: kulturLabelFromKultur({
        kultur: revRowNachKultur,
        store,
      }),
      label: 'Nach Kultur',
    },
    {
      valueInRow: row?.nach_ausgepflanzt == true,
      valueInRev: revRow?.nach_ausgepflanzt == true,
      label: 'Nach ausgepflanzt',
    },
    {
      valueInRow: row?.geplant == true,
      valueInRev: revRow?.geplant == true,
      label: 'geplant',
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
}

export default createDataArrayForRevComparison

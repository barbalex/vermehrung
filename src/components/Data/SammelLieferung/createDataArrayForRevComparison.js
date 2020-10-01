import { DateTime } from 'luxon'

import sammlungLabelFromSammlung from '../Lieferung/Lieferung/sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../../../utils/kulturLabelFromKultur'

const createDataArrayForRevComparison = ({ row, revRow, store }) => [
  {
    valueInRow: row?.art?.art_ae_art?.name,
    valueInRev: revRow?.art?.art_ae_art?.name,
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
    valueInRow: row?.person?.fullname,
    valueInRev: revRow?.person?.fullname,
    label: 'Person',
  },
  {
    valueInRow: sammlungLabelFromSammlung(row.sammlung),
    valueInRev: sammlungLabelFromSammlung(revRow.sammlung),
    label: 'Von Sammlung',
  },
  {
    valueInRow: kulturLabelFromKultur({
      kultur: row.kulturByVonKulturId,
      store,
    }),
    valueInRev: kulturLabelFromKultur({
      kultur: revRow.kulturByVonKulturId,
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
      kultur: row.kulturByNachKulturId,
      store,
    }),
    valueInRev: kulturLabelFromKultur({
      kultur: revRow.kulturByNachKulturId,
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

export default createDataArrayForRevComparison

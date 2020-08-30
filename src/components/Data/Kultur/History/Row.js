import React from 'react'
import { observer } from 'mobx-react-lite'

import History from '../../../shared/History'
import herkunftLabelFromHerkunft from '../Form/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../Form/gartenLabelFromGarten'

const HistoryRow = ({ row, revRow, onClickUebernehmen }) => {
  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
    },
    {
      valueInRow: herkunftLabelFromHerkunft(row),
      valueInRev: herkunftLabelFromHerkunft(revRow),
      label: 'Herkunft',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: gartenLabelFromGarten(row),
      valueInRev: gartenLabelFromGarten(revRow),
      label: 'Garten',
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

  return (
    <History
      rev={revRow._rev}
      dataArray={dataArray}
      onClickUebernehmen={onClickUebernehmen}
    />
  )
}

export default observer(HistoryRow)

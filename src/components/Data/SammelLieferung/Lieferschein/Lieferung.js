import React, { useContext, useState, useEffect } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import styled from 'styled-components'
import { combineLatest, of as $of } from 'rxjs'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../storeContext'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

const StyledTableCell = styled(TableCell)`
  vertical-align: top !important;
`

const Zeile = ({ value }) => <div>{value}</div>

const LieferungForLieferschein = ({ lieferung: row }) => {
  const store = useContext(StoreContext)
  const { db } = store

  const [dataState, setDataState] = useState({
    artLabel: '',
    herkunftLabel: '',
  })
  useEffect(() => {
    const artObservable = row.art_id
      ? db.get('art').findAndObserve(row.art_id)
      : $of({})
    const vonKulturHerkunftObservable = row.von_kultur_id
      ? db
          .get('herkunft')
          .query(Q.on('kultur', Q.where('id', row.von_kultur_id)))
          .observe()
      : $of({})
    const vonSammlungHerkunftObservable = row.von_sammlung_id
      ? db
          .get('herkunft')
          .query(Q.on('sammlung', Q.where('id', row.von_sammlung_id)))
          .observe()
      : $of({})
    const combinedObservables = combineLatest([
      artObservable,
      vonKulturHerkunftObservable,
      vonSammlungHerkunftObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([art, [vonKulturHerkunft], [vonSammlungHerkunft]]) => {
        let artLabel
        try {
          artLabel = await art.label.pipe(first$()).toPromise()
        } catch {}
        const herkunftLabel = vonKulturHerkunft
          ? herkunftLabelFromHerkunft({
              herkunft: vonKulturHerkunft,
            })
          : vonSammlungHerkunft
          ? herkunftLabelFromHerkunft({ herkunft: vonSammlungHerkunft })
          : ''

        setDataState({ artLabel, herkunftLabel })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, row.art, row.art_id, row.von_kultur_id, row.von_sammlung_id])
  const { artLabel, herkunftLabel } = dataState

  const wasArray = []
  row.anzahl_pflanzen && wasArray.push(`${row.anzahl_pflanzen} Pflanzen`)
  row.anzahl_auspflanzbereit &&
    wasArray.push(`${row.anzahl_auspflanzbereit} Pflanzen auspflanzbereit`)
  row.gramm_samen && wasArray.push(`${row.gramm_samen} Gramm Samen`)
  row.von_anzahl_individuen &&
    wasArray.push(`von ${row.von_anzahl_individuen} Individuen`)
  row.andere_menge && wasArray.push(row.andere_menge)
  const bemerkungen = row.bemerkungen ?? ''

  return (
    <TableRow>
      <StyledTableCell>{artLabel}</StyledTableCell>
      <StyledTableCell>{herkunftLabel}</StyledTableCell>
      <StyledTableCell>
        {wasArray.map((w, i) => (
          <Zeile key={i} value={w} />
        ))}
      </StyledTableCell>
      <StyledTableCell>{bemerkungen}</StyledTableCell>
    </TableRow>
  )
}

export default LieferungForLieferschein

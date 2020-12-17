import React, { useContext, useState, useEffect } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import { combineLatest, of as $of } from 'rxjs'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../models/reactUtils'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

const StyledTableCell = styled(TableCell)`
  vertical-align: top !important;
`

const Zeile = ({ value }) => <div>{value}</div>

const LieferungForLieferschein = ({ lieferung: l }) => {
  const store = useContext(StoreContext)
  const { db } = store

  console.log('LieferungForLieferschein', { l })
  const [dataState, setDataState] = useState({
    artLabel: '',
    herkunftLabel: '',
  })
  useEffect(() => {
    console.log('LieferungForLieferschein useEffect running')
    const artObservable = l.art.observe()
    const vonKulturHerkunftObservable = l.von_kultur_id
      ? db.collections
          .get('herkunft')
          .query(Q.on('kultur', Q.where('id', l.von_kultur_id)))
          .observe()
      : $of()
    const vonSammlungHerkunftObservable = l.von_sammlung_id
      ? db.collections
          .get('herkunft')
          .query(Q.on('sammlung', Q.where('id', l.von_sammlung_id)))
          .observe()
      : $of()
    console.log('LieferungForLieferschein useEffect', {
      artObservable,
      vonKulturHerkunftObservable,
      vonSammlungHerkunftObservable,
    })
    const combinedObservables = combineLatest([
      artObservable,
      vonKulturHerkunftObservable,
      vonSammlungHerkunftObservable,
    ])
    console.log(
      'LieferungForLieferschein useEffect, combinedObservables:',
      combinedObservables,
    )
    const subscription = combinedObservables.subscribe(
      async ([art, vonKulturHerkunft, vonSammlungHerkunft]) => {
        console.log('LieferungForLieferschein subscription result', {
          art,
          vonKulturHerkunft,
          vonSammlungHerkunft,
        })
        const artLabel = await art.label.pipe(first$()).toPromise()
        const herkunftLabel = vonKulturHerkunft
          ? herkunftLabelFromHerkunft({
              herkunft: vonKulturHerkunft,
            })
          : vonSammlungHerkunft
          ? herkunftLabelFromHerkunft({ herkunft: vonSammlungHerkunft })
          : ''
        console.log('LieferungForLieferschein subscription result', {
          artLabel,
          herkunftLabel,
        })

        setDataState({ artLabel, herkunftLabel })
      },
    )

    console.log('LieferungForLieferschein subscription', subscription)

    return () => subscription.unsubscribe()
  }, [db.collections, l.art, l.von_kultur_id, l.von_sammlung_id])
  const { artLabel, herkunftLabel } = dataState

  const wasArray = []
  l.anzahl_pflanzen && wasArray.push(`${l.anzahl_pflanzen} Pflanzen`)
  l.anzahl_auspflanzbereit &&
    wasArray.push(`${l.anzahl_auspflanzbereit} Pflanzen auspflanzbereit`)
  l.gramm_samen && wasArray.push(`${l.gramm_samen} Gramm Samen`)
  l.von_anzahl_individuen &&
    wasArray.push(`von ${l.von_anzahl_individuen} Individuen`)
  l.andere_menge && wasArray.push(l.andere_menge)
  const bemerkungen = l.bemerkungen ?? ''

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

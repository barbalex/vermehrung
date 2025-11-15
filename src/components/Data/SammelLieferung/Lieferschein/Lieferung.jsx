import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { combineLatest, of as $of } from 'rxjs'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { herkunftLabelFromHerkunft } from '../../../../utils/herkunftLabelFromHerkunft.js'

import { tableCell } from './Lieferung.module.css'

const Zeile = ({ value }) => <div>{value}</div>

export const LieferungForLieferschein = observer(({ lieferung: row }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [dataState, setDataState] = useState({
    artLabel: '',
    herkunftLabel: '',
  })
  useEffect(() => {
    const artObservable =
      row.art_id ? db.get('art').findAndObserve(row.art_id) : $of({})
    const vonKulturHerkunftObservable =
      row.von_kultur_id ?
        db
          .get('herkunft')
          .query(Q.on('kultur', 'id', row.von_kultur_id))
          .observe()
      : $of({})
    const vonSammlungHerkunftObservable =
      row.von_sammlung_id ?
        db
          .get('herkunft')
          .query(Q.on('sammlung', 'id', row.von_sammlung_id))
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
        const herkunftLabel =
          vonKulturHerkunft ?
            herkunftLabelFromHerkunft({
              herkunft: vonKulturHerkunft,
            })
          : vonSammlungHerkunft ?
            herkunftLabelFromHerkunft({ herkunft: vonSammlungHerkunft })
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
      <TableCell className={tableCell}>{artLabel}</TableCell>
      <TableCell className={tableCell}>{herkunftLabel}</TableCell>
      <TableCell className={tableCell}>
        {wasArray.map((w, i) => (
          <Zeile
            key={i}
            value={w}
          />
        ))}
      </TableCell>
      <TableCell className={tableCell}>{bemerkungen}</TableCell>
    </TableRow>
  )
})

import { useState, useEffect } from 'react'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import { kultursSortedFromKulturs } from '../../../../../../utils/kultursSortedFromKulturs.js'

export const useLieferungNachData = ({
  showFilter,
  row,
  herkunft,
  db,
  filter,
}) => {
  const [dataState, setDataState] = useState({ nachKulturWerte: [] })

  useEffect(() => {
    const kulturDelQuery =
      filter.kultur._deleted === false ? Q.where('_deleted', false)
      : filter.kultur._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    // BEWARE: need to include inactive kulturs
    const kultursObservable = db.get('kultur').query(kulturDelQuery).observe()
    const sammlungDelQuery =
      filter.sammlung._deleted === false ? Q.where('_deleted', false)
      : filter.sammlung._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const sammlungsObservable = db
      .get('sammlung')
      .query(sammlungDelQuery)
      .observe()
    const combinedObservables = combineLatest([
      kultursObservable,
      sammlungsObservable,
    ])
    const subscription = combinedObservables.subscribe(async ([kulturs]) => {
      const kultursFiltered = kulturs
        // show only kulturen of art_id
        .filter((k) => {
          if (row?.art_id) return k.art_id === row.art_id
          return true
        })
        // show only kulturen with same herkunft
        .filter((k) => {
          if (herkunft?.id) return k.herkunft_id === herkunft.id
          return true
        })
        // shall not be delivered to same kultur it came from
        .filter((k) => {
          if (
            row?.von_kultur_id &&
            row?.von_kultur_id !== row?.nach_kultur_id
          ) {
            return k.id !== row.von_kultur_id
          }
          return true
        })
      let kultur
      try {
        kultur = await db.get('kultur').find(row.von_kultur_id)
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [...kultursFiltered, ...(kultur && !showFilter ? [kultur] : [])],
        (e) => e.id,
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen,
      )
      const nachKulturWerte = await Promise.all(
        kultursSorted.map(async (el) => {
          let label
          try {
            label = await el.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: el.id,
            label,
            inaktiv: el.aktiv === false,
            link: ['Kulturen', el.id],
          }
        }),
      )

      setDataState({ nachKulturWerte })
    })

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.kultur._deleted,
    filter.sammlung._deleted,
    herkunft?.id,
    row?.art_id,
    row?.nach_kultur_id,
    row?.von_kultur_id,
    showFilter,
  ])

  return dataState
}

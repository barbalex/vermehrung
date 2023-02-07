import { useState, useEffect } from 'react'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import kultursSortedFromKulturs from '../../../../../../utils/kultursSortedFromKulturs'

const useData = ({ showFilter, row, herkunft, db, filter }) => {
  const [dataState, setDataState] = useState({ nachKulturWerte: [] })

  useEffect(() => {
    // BEWARE: need to include inactive kulturs
    const kultursObservable = db
      .get('kultur')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.kultur._deleted === false
              ? [false]
              : filter.kultur._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const sammlungsObservable = db
      .get('sammlung')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.sammlung._deleted === false
              ? [false]
              : filter.sammlung._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
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
        'id',
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

export default useData

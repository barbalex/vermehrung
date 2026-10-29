import { useState, useEffect } from 'react'
import { Q } from 'nitromelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import { kultursSortedFromKulturs } from '../../../../../../utils/kultursSortedFromKulturs.ts'

export const useLieferungNachData = ({
  showFilter,
  row,
  herkunft,
  db,
  filter,
}: {
  showFilter: boolean
  row: import('../../../../../../dbModel.ts').Lieferung | null | undefined
  herkunft:
    | import('../../../../../../dbModel.ts').Herkunft
    | null
    | undefined
  db: import('nitromelondb').Database | null
  filter: {
    kultur: { _deleted?: boolean | null }
    sammlung: { _deleted?: boolean | null }
  }
}) => {
  const [dataState, setDataState] = useState<{
    nachKulturWerte: {
      value: string
      label: string | undefined
      inaktiv: boolean
      link: string[]
    }[]
  }>({ nachKulturWerte: [] })

  useEffect(() => {
    const kulturDelQuery =
      filter.kultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    // BEWARE: need to include inactive kulturs
    const kultursObservable = db
      ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
      .query(kulturDelQuery)
      .observe()
    const sammlungDelQuery =
      filter.sammlung._deleted === false
        ? Q.where('_deleted', false)
        : filter.sammlung._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const sammlungsObservable = db
      ?.get<import('../../../../../../dbModel.ts').Sammlung>('sammlung')
      .query(sammlungDelQuery)
      .observe()
    const combinedObservables = combineLatest([
      kultursObservable,
      sammlungsObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../../dbModel.ts').Kultur[] | undefined,
          import('../../../../../../dbModel.ts').Sammlung[] | undefined,
        ]
      >
    ).subscribe(async ([kulturs]) => {
      const kultursFiltered = (kulturs ?? [])
        // show only kulturen of art_id
        .filter((k: import('../../../../../../dbModel.ts').Kultur) => {
          if (row?.art_id) return k.art_id === row.art_id
          return true
        })
        // show only kulturen with same herkunft
        .filter((k: import('../../../../../../dbModel.ts').Kultur) => {
          if (herkunft?.id) return k.herkunft_id === herkunft.id
          return true
        })
        // shall not be delivered to same kultur it came from
        .filter((k: import('../../../../../../dbModel.ts').Kultur) => {
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
        kultur = await db?.get('kultur').find(row?.von_kultur_id as string)
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [
          ...kultursFiltered,
          ...(kultur && !showFilter
            ? [
                kultur as import('../../../../../../dbModel.ts').Kultur,
              ]
            : []),
        ],
        (e) => e.id,
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen,
      )
      const nachKulturWerte = await Promise.all(
        kultursSorted.map(async (el) => {
          let label
          try {
            label = (await el.label.pipe(first$()).toPromise()) ?? ''
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

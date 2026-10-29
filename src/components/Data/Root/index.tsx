import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from 'nitromelondb'

import { RootRow as Row } from './Row.tsx'
import { dbAtom, userAtom, activeNodeArrayAtom } from '../../../store/index.ts'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { getShowArt } from '../../../utils/showArt.ts'
import { getShowGarten } from '../../../utils/showGarten.ts'
import { getShowHerkunft } from '../../../utils/showHerkunft.ts'
import { getShowKultur } from '../../../utils/showKultur.ts'
import { getShowLieferung } from '../../../utils/showLieferung.ts'
import { getShowPerson } from '../../../utils/showPerson.ts'
// import { getShowSammelLieferung } from '../../../utils/showSammelLieferung.ts'
import { getShowSammlung } from '../../../utils/showSammlung.ts'
import { getShowTeilkultur } from '../../../utils/showTeilkultur.ts'
import { getShowZaehlung } from '../../../utils/showZaehlung.ts'

import styles from './index.module.css'

export const Root = ({ filter: showFilter }: { filter?: boolean }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const [dataState, setDataState] = useState({
    showArt: false,
    showGarten: false,
    showHerkunft: false,
    showKultur: false,
    showLieferung: false,
    showPerson: false,
    // showSammelLieferung: false,
    showSammlung: false,
    showTeilkultur: false,
    showZaehlung: false,
  })

  const {
    showArt,
    showGarten,
    showHerkunft,
    showKultur,
    showLieferung,
    showPerson,
    // showSammelLieferung,
    showSammlung,
    showTeilkultur,
    showZaehlung,
  } = dataState

  useEffect(
    () => {
      const userPersonOptionsObservable = user.uid
        ? db
            ?.get<import('../../../dbModel.ts').PersonOption>('person_option')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns([
              'tree_kultur',
              'tree_teilkultur',
              'tree_zaehlung',
              'tree_lieferung',
            ])
        : $of([undefined])
      const userRoleObservable = user.uid
        ? db
            ?.get<import('../../../dbModel.ts').UserRole>('user_role')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns(['name'])
        : $of([])
      const combinedObservables = combineLatest([
        userPersonOptionsObservable,
        userRoleObservable,
      ])
      const subscription = (
        combinedObservables as unknown as import('rxjs').Observable<
          [
            [import('../../../dbModel.ts').PersonOption | undefined],
            [import('../../../dbModel.ts').UserRole | undefined],
          ]
        >
      ).subscribe(
        async ([[userPersonOption], [userRole]]) => {
          const sArt = getShowArt({
            userRole: userRole?.name,
            activeNodeArray,
          })
          const sGarten = getShowGarten()
          const sHerkunft = getShowHerkunft({
            userRole: userRole?.name,
            activeNodeArray,
          })
          const sKultur = getShowKultur({ userPersonOption, activeNodeArray })
          const sLieferung = getShowLieferung({
            userPersonOption,
            activeNodeArray,
          })
          const sPerson = getShowPerson()
          // const sSammelLieferung = getShowSammelLieferung({
          //   userPersonOption,
          //   activeNodeArray,
          // })
          const sSammlung = getShowSammlung({
            userRole: userRole?.name,
            activeNodeArray,
          })
          const sTeilkultur = getShowTeilkultur({
            userPersonOption,
            activeNodeArray,
          })
          const sZaehlung = getShowZaehlung({
            userPersonOption,
            activeNodeArray,
          })

          setDataState({
            showArt: sArt,
            showGarten: sGarten,
            showHerkunft: sHerkunft,
            showKultur: sKultur,
            showLieferung: sLieferung,
            showPerson: sPerson,
            // showSammelLieferung: sSammelLieferung,
            showSammlung: sSammlung,
            showTeilkultur: sTeilkultur,
            showZaehlung: sZaehlung,
          })
        },
      )

      return () => subscription?.unsubscribe?.()
    },
    // DO NOT ADD activeNodeArray
    // causes maximum update depth exceeded error
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      db,
      showArt,
      showGarten,
      showHerkunft,
      showKultur,
      showLieferung,
      showPerson,
      // showSammelLieferung,
      showSammlung,
      showTeilkultur,
      showZaehlung,
      user,
      user?.uid,
    ],
  )

  // TODO: filter according to roles
  // by adding each role name as key and true/false as value
  const rows = [
    ...(showArt
      ? [{ name: 'Arten', url: ['Arten'], table: 'art', sort: 1 }]
      : []),
    ...(showHerkunft
      ? [{ name: 'Herkünfte', url: ['Herkuenfte'], table: 'herkunft', sort: 2 }]
      : []),
    ...(showSammlung
      ? [
          {
            name: 'Sammlungen',
            url: ['Sammlungen'],
            table: 'sammlung',
            sort: 3,
          },
        ]
      : []),
    ...(showGarten
      ? [{ name: 'Gärten', url: ['Gaerten'], table: 'garten', sort: 4 }]
      : []),
    ...(showKultur
      ? [{ name: 'Kulturen', url: ['Kulturen'], table: 'kultur', sort: 5 }]
      : []),
    ...(showTeilkultur
      ? [
          {
            name: 'Teilkulturen',
            url: ['Teilkulturen'],
            table: 'teilkultur',
            sort: 6,
          },
        ]
      : []),
    ...(showZaehlung
      ? [{ name: 'Zählungen', url: ['Zaehlungen'], table: 'zaehlung', sort: 7 }]
      : []),
    ...(showLieferung
      ? [
          {
            name: 'Lieferungen',
            url: ['Lieferungen'],
            table: 'lieferung',
            sort: 8,
          },
        ]
      : []),
    // ...(showSammelLieferung ?
    //   [
    //     {
    //       name: 'Sammel-Lieferungen',
    //       url: ['Sammel-Lieferungen'],
    //       table: 'sammel_lieferung',
    //       sort: 9,
    //     },
    //   ]
    // : []),
    ...(showPerson
      ? [{ name: 'Personen', url: ['Personen'], table: 'person', sort: 11 }]
      : []),
  ]

  return (
    <ErrorBoundary>
      <div
        className={styles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        <div className={styles.fieldsContainer}>
          {rows.map((row) => (
            <Row key={row.name} row={row} style={{}} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}

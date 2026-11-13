import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { combineLatest } from 'rxjs'

import { dbAtom, apFilterAtom, filterArtAtom } from '../../../store/index.ts'
import { insertArtRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { ArtRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.ts'
import { constants } from '../../../utils/constants.ts'
import { ApFilter } from '../../shared/ApFilter.tsx'

import artStyles from './index.module.css'
import { triStateDeletedQuery } from '../../../utils/triStateDeletedQuery.ts'

export const Arten = ({ filter: showFilter }: { filter?: boolean }) => {
  const db = useAtomValue(dbAtom)
  const apFilter = useAtomValue(apFilterAtom)
  const artFilter = useAtomValue(filterArtAtom)

  const [dataState, setDataState] = useState<{
    arts: import('../../../dbModel.ts').Art[]
    totalCount: number
  }>({ arts: [], totalCount: 0 })
  useEffect(() => {
    const collection = db?.get<import('../../../dbModel.ts').Art>('art')
    if (!collection) return
    const delQuery = triStateDeletedQuery(artFilter._deleted)
    const totalCountObservable = collection?.query(delQuery).observeCount()
    const artsObservable = collection
      .query(...tableFilter({ table: 'art', apFilter }))
      .observeWithColumns(['ae_id', 'set', 'apflora_ap', 'apflora_av'])
    const combinedObservables = combineLatest([
      totalCountObservable,
      artsObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [number, import('../../../dbModel.ts').Art[]]
      >
    ).subscribe(async ([totalCount, arts]) => {
      const artsSorted = await artsSortedFromArts(arts)
      setDataState({ arts: artsSorted, totalCount })
    })

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of herkunftFilter changes
  }, [db, artFilter, apFilter])

  const { arts, totalCount } = dataState
  const filteredCount = arts.length
  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Art"
            table="art"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Arten</div>
            <div className={artStyles.titleSymbols}>
              <div className={artStyles.apFilterContainer}>
                <ApFilter />
              </div>
              <IconButton
                aria-label="neue Art"
                title="neue Art"
                onClick={
                  insertArtRev as unknown as import('react').MouseEventHandler
                }
                size="large"
              >
                <FaPlus />
              </IconButton>
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </div>
          </div>
        }
        <div className={artStyles.fieldsContainer}>
          <List
            rowComponent={Row}
            rowCount={arts.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: arts }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'

import { apFilterAtom } from '../../../store/index.ts'
import { insertArtRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { ArtRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'
import { ApFilter } from '../../shared/ApFilter.tsx'

import artStyles from './index.module.css'

export const Arten = ({ filter: showFilter }: { filter?: boolean }) => {
  const apFilter = useAtomValue(apFilterAtom)

  const {
    rows: arts,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Art>({
    table: 'art',
    observeColumns: ['ae_id', 'set', 'apflora_ap', 'apflora_av'],
    sort: artsSortedFromArts,
    apFilter,
  })

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

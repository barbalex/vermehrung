import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import { kulturIdInActiveNodeArrayAtom } from '../../../store/index.ts'
import { insertTeilkulturRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { TeilkulturRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { teilkulturSort } from '../../../utils/teilkulturSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const Teilkulturen = ({ filter: showFilter = false }) => {
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)

  const {
    rows: teilkulturs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Teilkultur>({
    table: 'teilkultur',
    observeColumns: ['name', 'ort1', 'ort2', 'ort3'],
    sort: (rows) => rows.sort(teilkulturSort),
    // only rows of the kultur in the url, if any
    buildClauses: () =>
      kulturIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : [],
    clauseDeps: [kulturIdInActiveNodeArray],
  })

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Teilkulturen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Teilkultur"
                title="neue Teilkultur"
                onClick={
                  insertTeilkulturRev as unknown as import('react').MouseEventHandler
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
            rowCount={teilkulturs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: teilkulturs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

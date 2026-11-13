import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import { kulturIdInActiveNodeArrayAtom } from '../../../store/index.ts'
import { insertZaehlungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { ZaehlungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { zaehlungSort } from '../../../utils/zaehlungSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const Zaehlungen = ({ filter: showFilter = false }) => {
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)

  const {
    rows: zaehlungs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Zaehlung>({
    table: 'zaehlung',
    observeColumns: ['datum', 'anzahl_pflanzen'],
    sort: (rows) => rows.sort(zaehlungSort),
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
            title="Zählung"
            table="zaehlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Zählungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Zählung"
                title="neue Zählung"
                onClick={
                  insertZaehlungRev as unknown as import('react').MouseEventHandler
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
            rowCount={zaehlungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: zaehlungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

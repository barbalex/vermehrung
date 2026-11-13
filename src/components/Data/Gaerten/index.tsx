import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import { personIdInActiveNodeArrayAtom } from '../../../store/index.ts'
import { insertGartenRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { GartenRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { gartensSortedFromGartens } from '../../../utils/gartensSortedFromGartens.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'
import { triStateQuery } from '../../../utils/triStateDeletedQuery.ts'

import artStyles from '../Arten/index.module.css'

export const Gaerten = ({ filter: showFilter = false }) => {
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)

  const {
    rows: gartens,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Garten>({
    table: 'garten',
    observeColumns: ['name', 'person_id'],
    sort: gartensSortedFromGartens,
    buildClauses: (filter) => [
      triStateQuery('aktiv', filter.aktiv),
      // only rows of the person in the url, if any
      ...(personIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []),
    ],
    clauseDeps: [personIdInActiveNodeArray],
  })

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Garten"
            table="garten"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Gärten</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neuer Garten"
                title="neuer Garten"
                onClick={
                  insertGartenRev as unknown as import('react').MouseEventHandler
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
            rowCount={gartens.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: gartens }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import { kulturIdInActiveNodeArrayAtom } from '../../../store/index.ts'
import { insertBedarfRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { BedarfRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { bedarfSort } from '../../../utils/bedarfSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

const onClickNew = () =>
  insertBedarfRev({ values: { jahr: new Date().getFullYear() } })

export const Bedarfe = ({ filter: showFilter = false }) => {
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)

  const {
    rows: bedarfe,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Bedarf>({
    table: 'bedarf',
    observeColumns: ['jahr', 'beschreibung'],
    sort: (rows) => rows.sort(bedarfSort),
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
            title="Bedarf"
            table="bedarf"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Bedarf</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="Neuer Bedarf"
                title="Neuer Bedarf"
                onClick={onClickNew}
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
            rowCount={bedarfe.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: bedarfe }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

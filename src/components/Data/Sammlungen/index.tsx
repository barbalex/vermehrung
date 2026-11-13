import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import {
  artIdInActiveNodeArrayAtom,
  herkunftIdInActiveNodeArrayAtom,
  personIdInActiveNodeArrayAtom,
} from '../../../store/index.ts'
import { insertSammlungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { SammlungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { sammlungsSortedFromSammlungs } from '../../../utils/sammlungsSortedFromSammlungs.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const Sammlungen = ({ filter: showFilter = false }) => {
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)

  const {
    rows: sammlungs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Sammlung>({
    table: 'sammlung',
    observeColumns: ['nr', 'datum', 'geplant'],
    sort: sammlungsSortedFromSammlungs,
    buildClauses: () => {
      // only rows of the art/herkunft/person in the url, if any
      const hierarchyQuery = []
      if (artIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['art']))
        hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
      }
      if (herkunftIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
        hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
      }
      if (personIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['person']))
        hierarchyQuery.push(Q.on('person', 'id', personIdInActiveNodeArray))
      }
      return hierarchyQuery
    },
    clauseDeps: [
      artIdInActiveNodeArray,
      herkunftIdInActiveNodeArray,
      personIdInActiveNodeArray,
    ],
  })
  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Sammlungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Sammlung"
                title="neue Sammlung"
                onClick={
                  insertSammlungRev as unknown as import('react').MouseEventHandler
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
            rowCount={sammlungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: sammlungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

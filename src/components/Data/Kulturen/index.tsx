import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import {
  artIdInActiveNodeArrayAtom,
  gartenIdInActiveNodeArrayAtom,
  herkunftIdInActiveNodeArrayAtom,
} from '../../../store/index.ts'
import { insertKulturRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { KulturRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { kultursSortedFromKulturs } from '../../../utils/kultursSortedFromKulturs.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'
import { triStateQuery } from '../../../utils/triStateDeletedQuery.ts'

import artStyles from '../Arten/index.module.css'

export const Kulturen = ({ filter: showFilter = false }) => {
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const gartenIdInActiveNodeArray = useAtomValue(gartenIdInActiveNodeArrayAtom)
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )

  const {
    rows: kulturs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Kultur>({
    table: 'kultur',
    observeColumns: ['art_id', 'herkunft_id', 'garten_id', 'zwischenlager'],
    sort: kultursSortedFromKulturs,
    buildClauses: (filter) => {
      // only rows of the art/garten/herkunft in the url, if any
      const hierarchyQuery = []
      if (gartenIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['garten']))
        hierarchyQuery.push(Q.on('garten', 'id', gartenIdInActiveNodeArray))
      }
      if (artIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['art']))
        hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
      }
      if (herkunftIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
        hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
      }
      return [triStateQuery('aktiv', filter.aktiv), ...hierarchyQuery]
    },
    clauseDeps: [
      gartenIdInActiveNodeArray,
      artIdInActiveNodeArray,
      herkunftIdInActiveNodeArray,
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
            title="Kultur"
            table="kultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Kulturen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
                onClick={
                  insertKulturRev as unknown as import('react').MouseEventHandler
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
            rowCount={kulturs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: kulturs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

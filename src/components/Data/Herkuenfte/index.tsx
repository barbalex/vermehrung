import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import {
  activeNodeArrayAtom,
  sammlungIdInActiveNodeArrayAtom,
  artIdInActiveNodeArrayAtom,
} from '../../../store/index.ts'
import { insertHerkunftRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { HerkunftRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { herkunftSort } from '../../../utils/herkunftSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const Herkuenfte = ({ filter: showFilter }: { filter?: boolean }) => {
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)

  const {
    rows: herkunfts,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Herkunft>({
    table: 'herkunft',
    observeColumns: ['gemeinde', 'lokalname', 'nr'],
    sort: (rows) => rows.sort(herkunftSort),
    // only rows of the sammlung (or the art's sammlungs) in the url
    buildClauses: () =>
      sammlungIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
        ]
      : artIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'art_id', artIdInActiveNodeArray),
        ]
      : [],
    clauseDeps: [sammlungIdInActiveNodeArray, artIdInActiveNodeArray],
  })

  // herkuenfte is top node
  // never enable adding below that
  const showPlus = activeNodeArray.length < 2

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Herkünfte</div>
            <div className={artStyles.titleSymbols}>
              {showPlus && (
                <IconButton
                  aria-label="neue Herkunft"
                  title="neue Herkunft"
                  onClick={
                    insertHerkunftRev as unknown as import('react').MouseEventHandler
                  }
                  size="large"
                >
                  <FaPlus />
                </IconButton>
              )}
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
            rowCount={herkunfts.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: herkunfts }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'

import { insertSammelLieferungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { SammelLieferungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { lieferungSort } from '../../../utils/lieferungSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const SammelLieferungen = ({ filter: showFilter = false }) => {
  const {
    rows: sammelLieferungs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').SammelLieferung>({
    table: 'sammel_lieferung',
    observeColumns: ['datum', 'anzahl_pflanzen'],
    sort: (rows) => rows.sort(lieferungSort),
  })

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Sammel-Lieferungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
                onClick={
                  insertSammelLieferungRev as unknown as import('react').MouseEventHandler
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
            rowCount={sammelLieferungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: sammelLieferungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

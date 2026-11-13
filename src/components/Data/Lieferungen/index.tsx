import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import {
  dbAtom,
  kulturIdInActiveNodeArrayAtom,
  personIdInActiveNodeArrayAtom,
  sammelLieferungIdInActiveNodeArrayAtom,
  sammlungIdInActiveNodeArrayAtom,
  activeNodeArrayAtom,
} from '../../../store/index.ts'
import { insertLieferungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { LieferungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { exists } from '../../../utils/exists.ts'
import { lieferungSort } from '../../../utils/lieferungSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'

import artStyles from '../Arten/index.module.css'

export const Lieferungen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const sammelLieferungIdInActiveNodeArray = useAtomValue(
    sammelLieferungIdInActiveNodeArrayAtom,
  )
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const {
    rows: lieferungs,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Lieferung>({
    table: 'lieferung',
    observeColumns: [
      'datum',
      'anzahl_pflanzen',
      'anzahl_auspflanzbereit',
      'geplant',
    ],
    sort: (rows) => rows.sort(lieferungSort),
    buildClauses: () => {
      const hierarchyQuery = []
      if (kulturIdInActiveNodeArray) {
        // kulturen connected by von_kultur_id or nach_kultur_id
        // depending on the url ending in Aus-Lieferungen or
        // An-Lieferungen. Q.on did not work because only one
        // association can be declared per table
        const kulturOnField =
          activeNodeArray[activeNodeArray.length - 1] === 'An-Lieferungen' ?
            'nach_kultur_id'
          : 'von_kultur_id'
        hierarchyQuery.push(Q.where(kulturOnField, kulturIdInActiveNodeArray))
      }
      if (sammelLieferungIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['sammel_lieferung']))
        hierarchyQuery.push(
          Q.on('sammel_lieferung', 'id', sammelLieferungIdInActiveNodeArray),
        )
      }
      if (personIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['person']))
        hierarchyQuery.push(Q.on('person', 'id', personIdInActiveNodeArray))
      }
      if (sammlungIdInActiveNodeArray) {
        hierarchyQuery.push(Q.experimentalJoinTables(['sammlung']))
        hierarchyQuery.push(Q.on('sammlung', 'id', sammlungIdInActiveNodeArray))
      }
      return hierarchyQuery
    },
    clauseDeps: [
      kulturIdInActiveNodeArray,
      sammelLieferungIdInActiveNodeArray,
      personIdInActiveNodeArray,
      sammlungIdInActiveNodeArray,
      // the von/nach switch depends on the last url element
      activeNodeArray[activeNodeArray.length - 1],
    ],
  })

  const add = async () => {
    const isSammelLieferung =
      activeNodeArray.length >= 2 && activeNodeArray[0] === 'Sammel-Lieferungen'
    if (isSammelLieferung) {
      const slId = activeNodeArray[1]
      let sl
      try {
        sl = await db
          ?.get<import('../../../dbModel.ts').SammelLieferung>(
            'sammel_lieferung',
          )
          .find(slId)
      } catch {}
      const additionalValuesToSet: Record<string, unknown> = {}

      // watermelon models keep field values in _raw
      const entries = Object.entries(sl?._raw ?? {})
        .filter(
          ([key]) =>
            !key.startsWith('_') &&
            ![
              'lieferungs',
              'kulturByNachKulturId',
              'kulturByVonKulturId',
              'person',
              'sammlung',
            ].includes(key),
        )
        .filter(([, value]) => exists(value))
      for (const [key, value] of entries) {
        const keyToUse = key === 'id' ? 'sammel_lieferung_id' : key
        additionalValuesToSet[keyToUse] = value
      }
      additionalValuesToSet.sammel_lieferung_id = slId
      return insertLieferungRev({
        values: additionalValuesToSet,
      })
    }
    insertLieferungRev({ values: {} })
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Lieferungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                aria-label="neue Lieferung"
                title="neue Lieferung"
                onClick={add}
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
            rowCount={lieferungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: lieferungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

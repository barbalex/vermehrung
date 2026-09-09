import { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import {
  MdDeleteSweep as DeleteFilterIcon,
  MdOutlineDeleteSweep as DeleteFilterIconOutlined,
} from 'react-icons/md'
import IconButton from '@mui/material/IconButton'

import {
  filterFilteredAtom,
  tableIsFilteredAtom,
  emptyFilterTable,
  emptyFilter,
} from '../../store/index.js'

import styles from './FilterTitle.module.css'

export const FilterTitle = ({ title, table, totalCount, filteredCount }) => {
  const existsTableFilterAtom = useMemo(
    () => tableIsFilteredAtom(table),
    [table],
  )
  const existsTableFilter = useAtomValue(existsTableFilterAtom)
  const filtered = useAtomValue(filterFilteredAtom)

  const onEmptyTable = () => emptyFilterTable({ table })

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <div className={styles.filterNumbers}>
          <span title="gefilterte Anzahl">{filteredCount}</span>/
          <span title="ungefilterte Anzahl">{totalCount}</span>
        </div>
        {existsTableFilter && (
          <IconButton
            aria-label={`${title}-Filter entfernen`}
            title={`${title}-Filter entfernen`}
            onClick={onEmptyTable}
            size="medium"
          >
            <DeleteFilterIconOutlined className={styles.deleteFilterIcon2} />
          </IconButton>
        )}
        {filtered && (
          <DeleteFilterIcon
            aria-label="Alle Filter entfernen"
            title="Alle Filter entfernen"
            onClick={emptyFilter}
            className={styles.deleteFilterIcon}
          />
        )}
      </div>
    </div>
  )
}

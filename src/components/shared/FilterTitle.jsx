import { useContext } from 'react'
import {
  MdDeleteSweep as DeleteFilterIcon,
  MdOutlineDeleteSweep as DeleteFilterIconOutlined,
} from 'react-icons/md'
import IconButton from '@mui/material/IconButton'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'

import styles from './FilterTitle.module.css'

export const FilterTitle = observer(
  ({ title, table, totalCount, filteredCount }) => {
    const store = useContext(MobxStoreContext)
    const { tableIsFiltered, filtered, emptyTable, empty } = store.filter

    const existsTableFilter = tableIsFiltered({
      table,
    })
    const onEmptyTable = () => emptyTable({ table })

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
              onClick={empty}
              className={styles.deleteFilterIcon}
            />
          )}
        </div>
      </div>
    )
  },
)

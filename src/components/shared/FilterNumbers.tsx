import MenuItem from '@mui/material/MenuItem'

import styles from './FilterNumbers.module.css'

export const FilterNumbers = ({ filteredCount, totalCount, asMenu }) => {
  if (asMenu) {
    return (
      <MenuItem
        dense
        className={styles.menuItem}
      >
        <span title="gefilterte Anzahl">{filteredCount}</span>/
        <span title="totale Anzahl">{totalCount}</span>
      </MenuItem>
    )
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div
          className={styles.filtered}
          title="gefilterte Anzahl"
        >
          {filteredCount}
        </div>
        <div
          className={styles.total}
          title="totale Anzahl"
        >
          {totalCount}
        </div>
      </div>
    </div>
  )
}

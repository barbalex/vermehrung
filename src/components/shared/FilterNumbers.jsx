import MenuItem from '@mui/material/MenuItem'

import {
  outerContainer,
  container,
  filtered,
  total,
  menuItem,
} from './FilterNumbers.module.css'

export const FilterNumbers = ({ filteredCount, totalCount, asMenu }) => {
  if (asMenu) {
    return (
      <MenuItem
        dense
        className={menuItem}
      >
        <span title="gefilterte Anzahl">{filteredCount}</span>/
        <span title="totale Anzahl">{totalCount}</span>
      </MenuItem>
    )
  }

  return (
    <div className={outerContainer}>
      <div className={container}>
        <div
          className={filtered}
          title="gefilterte Anzahl"
        >
          {filteredCount}
        </div>
        <div
          className={total}
          title="totale Anzahl"
        >
          {totalCount}
        </div>
      </div>
    </div>
  )
}

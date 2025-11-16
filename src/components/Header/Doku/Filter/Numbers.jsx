import {
  container,
  innerContainer,
  filtered,
  total,
} from './Numbers.module.css'

export const FilterNumbers = ({ filteredCount, totalCount }) => (
  <div className={container}>
    <div className={innerContainer}>
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

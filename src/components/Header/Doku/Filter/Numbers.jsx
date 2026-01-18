import styles from './Numbers.module.css'

export const FilterNumbers = ({ filteredCount, totalCount }) => (
  <div className={styles.container}>
    <div className={styles.innerContainer}>
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

import { Row } from './Row.tsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.tsx'

import styles from './index.module.css'

export const Choose = ({ qks }) => (
  <ErrorBoundary>
    <div className={styles.container}>
      <div className={styles.info}>Diese Wahl gilt für alle Arten</div>
      <div className={styles.fieldsContainer}>
        {qks.map((row) => (
          <Row
            key={row.id}
            qk={row}
          />
        ))}
      </div>
    </div>
  </ErrorBoundary>
)

import { ChooseKulturQkRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.jsx'

import styles from './index.module.css'

export const ChooseKulturQk = ({ qks }) => (
  <ErrorBoundary>
    <div className={styles.container}>
      <div className={styles.info}>Diese Wahl gilt für alle Kulturen</div>
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

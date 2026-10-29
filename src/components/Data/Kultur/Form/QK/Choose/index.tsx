import { ChooseKulturQkRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.tsx'

import styles from './index.module.css'

export const ChooseKulturQk = ({
  qks,
}: {
  qks: import('../../../../../../dbModel.ts').KulturQk[]
}) => (
  <ErrorBoundary>
    <div className={styles.container}>
      <div className={styles.info}>Diese Wahl gilt für alle Kulturen</div>
      <div className={styles.fieldsContainer}>
        {qks.map((row) => (
          <Row key={row.id} qk={row} />
        ))}
      </div>
    </div>
  </ErrorBoundary>
)

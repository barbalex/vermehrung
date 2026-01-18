import { Conflict } from './Conflict.jsx'

import styles from './index.module.css'

export const ConflictList = ({
  conflicts,
  activeConflict,
  setActiveConflict,
}) => (
  <div className={styles.container}>
    {[...conflicts].sort().map((conflict) => (
      <Conflict
        key={conflict}
        conflict={conflict}
        activeConflict={activeConflict}
        setActiveConflict={setActiveConflict}
      />
    ))}
  </div>
)

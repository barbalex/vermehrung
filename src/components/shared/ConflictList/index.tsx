import { Conflict } from './Conflict.tsx'

import styles from './index.module.css'

export const ConflictList = ({
  conflicts,
  activeConflict,
  setActiveConflict,
}: {
  conflicts: string[] | null
  activeConflict: string | null
  setActiveConflict: (conflict: string | null) => void
}) => (
  <div className={styles.container}>
    {[...(conflicts ?? [])].sort().map((conflict) => (
      <Conflict
        key={conflict}
        conflict={conflict}
        activeConflict={activeConflict}
        setActiveConflict={setActiveConflict}
      />
    ))}
  </div>
)

import { Conflict } from './Conflict.jsx'

import { container } from './index.module.css'

export const ConflictList = ({
  conflicts,
  activeConflict,
  setActiveConflict,
}) => (
  <div className={container}>
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

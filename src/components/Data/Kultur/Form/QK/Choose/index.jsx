import { ChooseKulturQkRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.jsx'

import { container, fieldsContainer, info } from './index.module.css'

export const ChooseKulturQk = ({ qks }) => (
  <ErrorBoundary>
    <div className={container}>
      <div className={info}>Diese Wahl gilt für alle Kulturen</div>
      <div className={fieldsContainer}>
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

import { Teilzaehlung } from './Teilzaehlung/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'

export const TeilzaehlungenRows = ({ kulturId, teilzaehlungs }) => (
  <ErrorBoundary>
    {teilzaehlungs.map((r, index) => (
      <Teilzaehlung
        key={r.id}
        index={index}
        id={r.id}
        kulturId={kulturId}
      />
    ))}
  </ErrorBoundary>
)

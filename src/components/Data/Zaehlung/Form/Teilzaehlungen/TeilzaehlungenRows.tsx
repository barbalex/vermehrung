import { Teilzaehlung } from './Teilzaehlung/index.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

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

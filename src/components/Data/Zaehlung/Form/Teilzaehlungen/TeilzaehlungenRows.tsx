import { Teilzaehlung } from './Teilzaehlung/index.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

export const TeilzaehlungenRows = ({
  kulturId,
  teilzaehlungs,
}: {
  kulturId?: string | null
  teilzaehlungs: import('../../../../../dbModel.ts').Teilzaehlung[]
}) => (
  <ErrorBoundary>
    {teilzaehlungs.map((r, index: number) => (
      <Teilzaehlung key={r.id} index={index} id={r.id} kulturId={kulturId ?? undefined} />
    ))}
  </ErrorBoundary>
)

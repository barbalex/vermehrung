import React from 'react'
import { observer } from 'mobx-react-lite'

import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const TeilzaehlungenRows = ({ kulturId, teilzaehlungs }) => (
  <ErrorBoundary>
    {teilzaehlungs.map((r, index) => (
      <Teilzaehlung key={r.id} index={index} id={r.id} kulturId={kulturId} />
    ))}
  </ErrorBoundary>
)

export default observer(TeilzaehlungenRows)

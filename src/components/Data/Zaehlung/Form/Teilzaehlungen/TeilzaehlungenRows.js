import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const TeilzaehlungenRows = ({ kulturId, teilzaehlungs }) => {
  const store = useContext(StoreContext)
  const { teilkultursSorted } = store

  const teilkulturenWerte = useMemo(
    () =>
      teilkultursSorted
        .filter((t) => t.kultur_id === kulturId)
        .map((el) => ({
          value: el.id,
          label: el.name,
        })),
    [kulturId, teilkultursSorted],
  )

  return (
    <ErrorBoundary>
      {teilzaehlungs.map((r, index) => (
        <Teilzaehlung
          key={r.id}
          index={index}
          id={r.id}
          kulturId={kulturId}
          teilkulturenWerte={teilkulturenWerte}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)

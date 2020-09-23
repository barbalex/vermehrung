import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const TeilzaehlungenRows = ({ kulturId, zaehlungId }) => {
  const store = useContext(StoreContext)
  const { teilkultursSorted, teilzaehlungsSorted } = store

  const rows = teilzaehlungsSorted.filter((v) => v.zaehlung_id === zaehlungId)

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
      {rows.map((r, index) => (
        <Teilzaehlung
          key={r.id}
          index={index}
          id={r.id}
          zaehlungId={zaehlungId}
          kulturId={kulturId}
          teilzaehlung={r}
          teilkulturenWerte={teilkulturenWerte}
          rows={rows}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)

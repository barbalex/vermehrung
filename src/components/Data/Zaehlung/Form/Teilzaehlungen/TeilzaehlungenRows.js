import React, { useMemo, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import teilzaehlungSort from '../../../../../utils/teilzaehlungSort'

const TeilzaehlungenRows = ({ kulturId, zaehlung }) => {
  const store = useContext(StoreContext)
  const { teilkultursSorted } = store

  const [rows, setRows] = useState([])
  useEffect(() => {
    zaehlung?.teilzaehlungs
      ?.fetch()
      .then((val) => setRows(val.sort(teilzaehlungSort)))
  }, [zaehlung.teilzaehlungs])

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
          zaehlungId={zaehlung.id}
          kulturId={kulturId}
          teilzaehlung={r}
          teilkulturenWerte={teilkulturenWerte}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)

import React, { useState } from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useObservableState, useSubscription } from 'observable-hooks'

import ErrorBoundary from './ErrorBoundaryForDataProvider'

const HerkunftDataProvider = ({ id, table, children }) => {
  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661444478
  // TODO:
  // when being updated from live queries
  // the value is always one step behind!
  // maybe due to observables not being "hot"
  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661790668
  const db = useDatabase()
  const row = useObservableState(
    db.collections.get(table).findAndObserve(id),
    null,
  )

  const [renderEnforcer, setRenderEnforcer] = useState(null)
  useSubscription(db.collections.get(table).findAndObserve(id), (val) => {
    // TODO:
    // this is a trick to get react components to rerender
    // when the observable changes
    // NEED TO GET RID OF THIS HACK
    // used to be: JSON.stringify(val._raw)
    // maybe using a running counter would be more efficient?
    // no need to stringify...
    // BUT: starts an endless cycle
    setRenderEnforcer(JSON.stringify(val._raw))
  })

  // need to ensure a row consisting of an observable is returned
  // if not, for instance calling useObservableState will error in child
  if (!row) return null

  // TODO:
  // findAndObserve can throw error
  // if url points to dataset but it's data was not yet loaded
  // can't catch the error above because inside hook
  // need to catch it with ErrorBoundary
  //console.log('DataProvider', { table, id, row })
  return (
    <ErrorBoundary>
      {React.cloneElement(children, { row, renderEnforcer })}
    </ErrorBoundary>
  )
}

export default HerkunftDataProvider

import React from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useObservableState } from 'observable-hooks'

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

  // TODO:
  // findAndObserve can throw error
  // if url points to dataset but it's data was not yet loaded
  // can't catch the error above because inside hook
  // need to catch it with ErrorBoundary
  return <ErrorBoundary>{React.cloneElement(children, { row })}</ErrorBoundary>
}

export default HerkunftDataProvider

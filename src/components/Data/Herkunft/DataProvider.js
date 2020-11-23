import React from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useObservableEagerState, useObservable } from 'observable-hooks'

import Herkunft from './Herkunft'

const HerkunftDataProvider = ({ id, filter }) => {
  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661444478
  // TODO:
  // when being updated from live queries
  // the value is always one step behind!
  // maybe due to observables not being "hot"
  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661790668
  const db = useDatabase()
  const herkunft$ = useObservable(() =>
    db.collections.get('herkunft').findAndObserve(id),
  )
  const herkunft = useObservableEagerState(herkunft$, null)

  return <Herkunft id={id} filter={filter} row={herkunft} />
}

export default HerkunftDataProvider

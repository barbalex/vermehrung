import React from 'react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useObservableState } from 'observable-hooks'

import Herkunft from './index'

const HerkunftDataProvider = ({
  id = '99999999-9999-9999-9999-999999999999',
  filter,
}) => {
  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661444478
  const db = useDatabase()
  const herkunft = useObservableState(
    db.collections.get('herkunft').findAndObserve(id),
    null,
  )

  return <Herkunft id={id} filter={filter} herkunft={herkunft} />
}

export default HerkunftDataProvider

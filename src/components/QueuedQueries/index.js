import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import ErrorBoundary from './shared/ErrorBoundary'
import { StoreContext } from '../models/reactUtils'
import QueuedQuery from './QueuedQuery'

const QueuedQueries = () => {
  const store = useContext(StoreContext)
  const { queuedQueries } = store

  if (!queuedQueries.length) {
    return 'keine Pendenten Operationen!'
  }

  return (
    <ErrorBoundary>
      {queuedQueries.map((qq) => (
        <QueuedQuery key={qq.id} qq={qq} />
      ))}
    </ErrorBoundary>
  )
}

export default QueuedQueries

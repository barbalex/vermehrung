import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../shared/ErrorBoundary'
import { StoreContext } from '../../models/reactUtils'
import QueuedQuery from './QueuedQuery'

const Container = styled.div`
  padding: 15px;
`
const CloseIcon = styled(IconButton)`
  position: absolute !important;
  right: 3px;
  top: 70px;
`

const QueuedQueries = () => {
  const store = useContext(StoreContext)
  const { queuedQueries, setShowQueuedQueries } = store

  const onClickCloseIcon = useCallback(() => setShowQueuedQueries(false), [
    setShowQueuedQueries,
  ])

  if (!queuedQueries.size) {
    return (
      <Container>
        <CloseIcon
          title="schliessen"
          aria-label="schliessen"
          onClick={onClickCloseIcon}
        >
          <FaTimes />
        </CloseIcon>
        Es gibt momentan keine pendenten Operationen
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <CloseIcon
          title="schliessen"
          aria-label="schliessen"
          onClick={onClickCloseIcon}
        >
          <FaTimes />
        </CloseIcon>
        {[...queuedQueries.values()].map((qq) => (
          <QueuedQuery key={qq.id} qq={qq} />
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(QueuedQueries)

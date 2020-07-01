import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../shared/ErrorBoundary'
import { StoreContext } from '../../models/reactUtils'
import QueuedQuery from './QueuedQuery'

const Title = styled.h3`
  padding: 15px 15px 0 15px;
`
const NoOpsContainer = styled.div`
  padding: 15px;
`
const Container = styled.div``
const OuterContainer = styled.div`
  height: calc(100vh - 64px - 15px - 23px - 23px);
  overflow-y: auto;
  overflow-x: hidden;
`
const QueriesContainer = styled.div`
  padding: 0 15px;
  display: grid;
  grid-template-columns: 180px auto auto auto auto auto 100px;
  column-gap: 5px;
  > * {
    position: relative;
  }
`
const Heading = styled.div`
  font-weight: 600;
`
const RevertHeading = styled.div`
  font-weight: 600;
  justify-self: center;
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
      <NoOpsContainer>
        <CloseIcon
          title="schliessen"
          aria-label="schliessen"
          onClick={onClickCloseIcon}
        >
          <FaTimes />
        </CloseIcon>
        Es gibt momentan keine pendenten Operationen
      </NoOpsContainer>
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
        <Title>Ausstehende Operationen:</Title>
        <OuterContainer>
          <QueriesContainer>
            <Heading>Zeit</Heading>
            <Heading>Tabelle</Heading>
            <Heading>Feld / Operation</Heading>
            <Heading>ID</Heading>
            <Heading>vorher</Heading>
            <Heading>nachher</Heading>
            <RevertHeading>widerrufen</RevertHeading>
            {[...queuedQueries.values()].reverse().map((qq, i) => (
              <QueuedQuery key={qq.id} qq={qq} index={i} />
            ))}
          </QueriesContainer>
        </OuterContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(QueuedQueries)

import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import ErrorBoundary from '../shared/ErrorBoundary'
import StoreContext from '../../storeContext'
import QueuedQuery from './QueuedQuery'
import getConstants from '../../utils/constants'

const constants = getConstants()

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.h3`
  padding: 15px 15px 0 15px;
`
const NoOpsContainer = styled.div`
  padding: 0 15px;
`
const Container = styled.div``
const OuterContainer = styled.div`
  height: calc(100vh - 64px - 15px - 23px - 23px);
  overflow-x: hidden;
  /* hide native scrollbar */
  .simplebar-content-wrapper::-webkit-scrollbar {
    display: none;
  }
`
const QueriesContainer = styled.div`
  padding: 0 15px;
  display: grid;
  grid-template-columns: 180px auto auto auto auto auto 100px;
  column-gap: 5px;
  > * {
    position: relative;
  }
  overflow: hidden;
`
const Heading = styled.div`
  font-weight: 700;
`
const RevertHeading = styled.div`
  font-weight: 700;
  justify-self: center;
`
const CloseIcon = styled(IconButton)`
  margin-right: 5px !important;
`

const QueuedQueries = () => {
  const store = useContext(StoreContext)
  const { queuedQueries, setShowQueuedQueries } = store

  const onClickCloseIcon = useCallback(() => setShowQueuedQueries(false), [
    setShowQueuedQueries,
  ])
  const openDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/offline`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (!queuedQueries.size) {
    return (
      <Container>
        <TitleRow>
          <Title>Ausstehende Operationen</Title>
          <div>
            <IconButton
              aria-label={`Dokumentation zu "offline arbeiten" lesen`}
              title={`Dokumentation zu "offline arbeiten" lesen`}
              onClick={openDocs}
            >
              <IoMdInformationCircleOutline />
            </IconButton>
            <CloseIcon
              title="schliessen"
              aria-label="schliessen"
              onClick={onClickCloseIcon}
            >
              <FaTimes />
            </CloseIcon>
          </div>
        </TitleRow>
        <NoOpsContainer>
          Es gibt momentan keine pendenten Operationen
        </NoOpsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <TitleRow>
          <Title>Ausstehende Operationen:</Title>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openDocs}
            >
              <IoMdInformationCircleOutline />
            </IconButton>
            <CloseIcon
              title="schliessen"
              aria-label="schliessen"
              onClick={onClickCloseIcon}
            >
              <FaTimes />
            </CloseIcon>
          </div>
        </TitleRow>
        <OuterContainer>
          <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
            <QueriesContainer>
              <Heading>Zeit</Heading>
              <Heading>Tabelle</Heading>
              <Heading>ID</Heading>
              <Heading>Feld / Operation</Heading>
              <Heading>vorher</Heading>
              <Heading>nachher</Heading>
              <RevertHeading>widerrufen</RevertHeading>
              {[...queuedQueries.values()].reverse().map((qq, i) => (
                <QueuedQuery key={qq.id} qq={qq} index={i} />
              ))}
            </QueriesContainer>
          </SimpleBar>
        </OuterContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(QueuedQueries)

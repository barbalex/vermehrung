import React, { useContext, useCallback } from 'react'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'

import ErrorBoundary from '../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import QueuedQuery from './QueuedQuery.jsx'
import { constants } from '../../utils/constants.js'

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
const Container = styled.div`
  min-height: calc(100dvh - ${constants.appBarHeight}px);
  position: relative;
`
const OuterContainer = styled.div`
  height: calc(100dvh - ${constants.appBarHeight}px - 15px - 23px - 23px);
  overflow-x: hidden;
  overflow-y: auto;
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

export const QueuedQueries = observer(() => {
  const store = useContext(MobxStoreContext)
  const navigate = useNavigate()
  const { queuedQueries } = store

  const onClickCloseIcon = useCallback(() => {
    // ISSUE: cant use navigate(-1) as that can navigate to same url and user has to click twice to go back
    navigate('/Vermehrung')
  }, [navigate])
  const openDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/offline`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
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
              size="large"
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
          <Title>Ausstehende Operationen</Title>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openDocs}
              size="large"
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
          <QueriesContainer>
            <Heading>Zeit</Heading>
            <Heading>Tabelle</Heading>
            <Heading>ID</Heading>
            <Heading>Feld / Operation</Heading>
            <Heading>vorher</Heading>
            <Heading>nachher</Heading>
            <RevertHeading>widerrufen</RevertHeading>
            {[...queuedQueries.values()].reverse().map((qq, i) => (
              <QueuedQuery
                key={qq.id}
                qq={qq}
                index={i}
              />
            ))}
          </QueriesContainer>
        </OuterContainer>
      </Container>
    </ErrorBoundary>
  )
})

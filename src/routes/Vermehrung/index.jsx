import React, { useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import CircularProgress from '@mui/material/CircularProgress'
import { useLocation } from 'react-router-dom'

import StoreContext from '../../storeContext'
import activeNodeArrayFromPathname from '../../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../../utils/openNodesFromActiveNodeArray'
import initializeSubscriptions from '../../utils/initializeSubscriptions'
import Login from '../../components/Login'
import ErrorBoundary from '../../components/shared/ErrorBoundary'
import ApiDetector from '../../components/ApiDetector'
import QueuedQueries from '../../components/QueuedQueries'
import tableNames from '../../utils/tableNames'
import constants from '../../utils/constants'
import VermehrungComponent from './Vermehrung'

const Container = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`
const SpinnerContainer = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginContainer = styled.div`
  margin: 20px;
`
const SpinnerText = styled.div`
  padding-top: 10px;
`
const SpinnerText2 = styled.div`
  padding: 0;
`

// trying to persist indexedDB
// https://dexie.org/docs/StorageManager#controlling-persistence
// TODO: consider calling this only if user choose it in settings
// or pop own window to explain as shown in above link
// because it pops a request window
async function persist() {
  return (
    (await navigator.storage) &&
    navigator.storage.persist &&
    navigator.storage.persist()
  )
}

const VermehrungIndex = () => {
  const { pathname } = useLocation()
  const store = useContext(StoreContext)
  const {
    gettingAuthUser,
    authorizing,
    initialDataQueried,
    initiallyQuerying,
    showQueuedQueries,
    user,
    online,
  } = store
  const { setLastActiveNodeArray, setOpenNodes, wsReconnectCount } = store.tree

  useEffect(() => {
    persist().then((val) => console.log('storage is persisted safely:', val))
  }, [])

  const existsUser = !!user?.uid

  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
    // set last touched node in case project is directly opened on it
    setLastActiveNodeArray(activeNodeArray)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('vermehrung, subscription effect', { authorizing, existsUser })
    let unsubscribe
    if (existsUser && !authorizing) {
      // TODO:
      // need to fetch user to get role
      // then pass role to initializeSubscriptions to skip fields
      // this user has no access to
      // would be much nicer if hasura simply passed null values
      // https://github.com/hasura/graphql-engine/issues/6541

      // TODO:
      // if no data exists yet
      // set initial data queried false
      // then true on first data event
      unsubscribe = initializeSubscriptions({ store })
    }
    return function cleanup() {
      if (unsubscribe && Object.values(unsubscribe)) {
        Object.values(unsubscribe).forEach((value) => value?.unsubscribe?.())
      }
    }
    // wsReconnectCount is made so a subscription can provoke re-subscription on error
    // see initializeSubscriptions, unsubscribe.ae_art
  }, [existsUser, store, wsReconnectCount, authorizing])

  if (gettingAuthUser) {
    return (
      <ErrorBoundary>
        <SpinnerContainer>
          <CircularProgress />
          {/* <SpinnerText>{isIOS ? 'prüfe' : 'autorisiere'}</SpinnerText> */}
          <SpinnerText>autorisiere</SpinnerText>
        </SpinnerContainer>
      </ErrorBoundary>
    )
  }

  if (!existsUser) {
    return (
      <ErrorBoundary>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </ErrorBoundary>
    )
  }

  // When user started up offline and becomes online
  // this will also show spinner - NOT GOOD
  // Even worse: spinner seems to persist - need to reload
  if (online && !initialDataQueried) {
    return (
      <ErrorBoundary>
        <SpinnerContainer>
          <CircularProgress />
          <SpinnerText>lade Daten für offline-Nutzung</SpinnerText>
          <SpinnerText2>{tableNames(initiallyQuerying)}</SpinnerText2>
        </SpinnerContainer>
      </ErrorBoundary>
    )
  }

  /*if (
    error &&
    !error.message.includes('Failed to fetch') &&
    !error.message.includes('JWT')
  ) {
    return (
      <ErrorBoundary>
        <Layout>
          <ErrorContainer>{error.message}</ErrorContainer>
        </Layout>
      </ErrorBoundary>
    )
  }
  if (error && error.message.includes('JWT')) {
    checkAuthOnError({ error, store })
  }*/
  if (showQueuedQueries) {
    return (
      <>
        <Container>
          <QueuedQueries />
        </Container>
        <ApiDetector />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <VermehrungComponent />
      <ApiDetector />
    </ErrorBoundary>
  )
}

export default observer(VermehrungIndex)

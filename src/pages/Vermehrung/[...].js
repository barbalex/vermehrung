import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import CircularProgress from '@mui/material/CircularProgress'
import { Router } from '@reach/router'

import StoreContext from '../../storeContext'
import Layout from '../../components/Layout'
import activeNodeArrayFromPathname from '../../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../../utils/openNodesFromActiveNodeArray'
import initializeSubscriptions from '../../utils/initializeSubscriptions'
import Login from '../../components/Login'
import ErrorBoundary from '../../components/shared/ErrorBoundary'
import ApiDetector from '../../components/ApiDetector'
import QueuedQueries from '../../components/QueuedQueries'
import tableNames from '../../utils/tableNames'
import constants from '../../utils/constants'
import Header from '../../components/Head'
import VermehrungComponent from './_Vermehrung'

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

const Vermehrung = ({ location }) => {
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
  const {
    setActiveNodeArray,
    setLastTouchedNode,
    setOpenNodes,
    wsReconnectCount,
  } = store.tree

  const existsUser = !!user?.uid

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
    // set last touched node in case project is directly opened on it
    setLastTouchedNode(activeNodeArray)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // user pushed back button > update activeNodeArray
    setActiveNodeArray(activeNodeArray, 'nonavigate')
  }, [activeNodeArray, pathname, setActiveNodeArray])

  useEffect(() => {
    // console.log('vermehrung, subscription effect: authorizing:', authorizing)
    // console.log('vermehrung, subscription effect: existsUser:', existsUser)
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

  //if (gettingAuthUser || isIOS) {
  if (gettingAuthUser) {
    return (
      <ErrorBoundary>
        <Layout>
          <SpinnerContainer>
            <CircularProgress />
            {/* <SpinnerText>{isIOS ? 'prüfe' : 'autorisiere'}</SpinnerText> */}
            <SpinnerText>autorisiere</SpinnerText>
          </SpinnerContainer>
        </Layout>
      </ErrorBoundary>
    )
  }

  if (!existsUser) {
    return (
      <ErrorBoundary>
        <Layout>
          <LoginContainer>
            <Login />
          </LoginContainer>
        </Layout>
      </ErrorBoundary>
    )
  }

  if (online && !initialDataQueried) {
    return (
      <ErrorBoundary>
        <Layout>
          <SpinnerContainer>
            <CircularProgress />
            <SpinnerText>lade Daten für offline-Nutzung</SpinnerText>
            <SpinnerText2>{tableNames(initiallyQuerying)}</SpinnerText2>
          </SpinnerContainer>
        </Layout>
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
        <Layout>
          <Container>
            <QueuedQueries />
          </Container>
        </Layout>
        <ApiDetector />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Router>
          <VermehrungComponent path="*" />
        </Router>
      </Layout>
      <ApiDetector />
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

export const Head = () => <Header />
import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'
import { ImpulseSpinner as Spinner } from 'react-spinners-kit'
import { navigate } from 'gatsby'
import { useDatabase } from '@nozbe/watermelondb/hooks'

import { StoreContext } from '../models/reactUtils'
import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import initializeSubscriptions from '../utils/initializeSubscriptions'
import Tree from '../components/Tree'
import Data from '../components/Data'
import Filter from '../components/Filter'
import Login from '../components/Login'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import ApiDetector from '../components/ApiDetector'
import QueuedQueries from '../components/QueuedQueries'
import isThisIOS from '../utils/isIOS'

const Container = styled.div`
  min-height: calc(100vh - 64px);
`
const SpinnerContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginContainer = styled.div`
  margin: 20px;
`
const SpinnerText = styled.div`
  padding: 10px;
`
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`

const Vermehrung = ({ location }) => {
  const db = useDatabase()
  const store = useContext(StoreContext)
  const {
    activeForm,
    gettingAuthUser,
    initialDataQueried,
    isPrint,
    showQueuedQueries,
    singleColumnView,
    showTreeInSingleColumnView,
    user,
  } = store

  const [isIOS, setIsIOS] = useState(false)
  useEffect(() => {
    setIsIOS(isThisIOS())
  }, [])

  useEffect(() => {
    if (isIOS) navigate('/Dokumentation/iOS')
  }, [isIOS])

  const existsUser = !!user?.uid
  const {
    setOpenNodes,
    setActiveNodeArray,
    widthInPercentOfScreen,
  } = store.tree
  const showFilter = store.filter.show
  let treeWidth = singleColumnView
    ? (!showTreeInSingleColumnView && activeForm) || showFilter
      ? 0
      : // if no form is active, show only tree
        '100%'
    : `${widthInPercentOfScreen}%`
  // ensure tree is invisible when printing but still exists
  // (caused errors to render form without tree while printing)
  if (isPrint) treeWidth = 0

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // when pathname changes, update activeNodeArray
  // seems no more needed?
  useEffect(() => {
    // need not to navigate or app is blocked
    setActiveNodeArray(activeNodeArray, 'nonavigate')
  }, [activeNodeArray, pathname, setActiveNodeArray])

  useEffect(() => {
    let unsubscribe
    if (existsUser) {
      //console.log('Vermehrung initializing subsctiptions')
      // TODO:
      // if no data exists yet
      // set initial data queried false
      // then true on first data event
      unsubscribe = initializeSubscriptions({ store, db })
    }
    return function cleanup() {
      if (unsubscribe && Object.keys(unsubscribe)) {
        Object.keys(unsubscribe).forEach((table) => unsubscribe[table]())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existsUser])

  console.log('Vermehrung', { gettingAuthUser, isIOS, initialDataQueried })

  if (gettingAuthUser || isIOS) {
    return (
      <ErrorBoundary>
        <Layout>
          <SpinnerContainer>
            <Spinner
              size={50}
              frontColor="#4a148c"
              backColor="#4a148c1a"
              loading={true}
            />
            <SpinnerText>{isIOS ? 'prüfe' : 'autorisiere'}</SpinnerText>
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

  if (!initialDataQueried) {
    return (
      <ErrorBoundary>
        <Layout>
          <SpinnerContainer>
            <Spinner
              size={50}
              frontColor="#4a148c"
              backColor="#4a148c1a"
              loading={true}
            />
            <SpinnerText>
              lade alle Daten für offline - das kann dauern
            </SpinnerText>
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

  // hide resizer when tree is hidden
  const resizerStyle = treeWidth === 0 ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledSplitPane
            split="vertical"
            size={treeWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            <Tree />
            {showFilter ? <Filter /> : <Data />}
          </StyledSplitPane>
        </Container>
      </Layout>
      <ApiDetector />
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

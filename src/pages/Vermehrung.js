import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'
import { ImpulseSpinner as Spinner } from 'react-spinners-kit'
import gql from 'graphql-tag'

import { StoreContext, useQuery } from '../models/reactUtils'
import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import initializeSubscriptions from '../utils/initializeSubscriptions'
import exists from '../utils/exists'
import checkHasuraClaimsOnError from '../utils/checkHasuraClaimsOnError'
import Tree from '../components/TreeContainer'
import Data from '../components/Data'
import Filter from '../components/Filter'
import Login from '../components/Login'
import ErrorBoundary from '../components/shared/ErrorBoundary'
import OnlineDetector from '../components/OnlineDetector'
import { art } from '../utils/fragments'

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
const ErrorContainer = styled.div`
  min-height: calc(100vh - 64px);
  padding: 15px;
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

const allDataQuery = gql`
  query AllDataQueryForVermehrung($run: Boolean!) {
    art @include(if: $run) {
      ...ArtFields
    }
  }
  ${art}
`

const Vermehrung = ({ location }) => {
  const store = useContext(StoreContext)
  const { activeForm, isPrint, user, authorizing, artsSorted } = store

  const existsUser = !!user.uid
  const { setOpenNodes, widthInPercentOfScreen, widthEnforced } = store.tree
  const showFilter = store.filter.show
  let treeWidth = exists(widthEnforced)
    ? activeForm || showFilter
      ? widthEnforced
      : // if no form is active, show only tree
        '100%'
    : `${widthInPercentOfScreen}%`
  // ensure tree is invisible when printing but still exists
  // (caused errors to render form without tree while printing)
  if (isPrint) treeWidth = 0

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  /**
   * FOR UNKNOWN REASON THIS QUERY NEEDS TO BE HERE
   * or else data will not be loaded on first render after emptying store
   */
  const run = !authorizing && !artsSorted.length
  const { error } = useQuery(
    allDataQuery,
    {
      variables: {
        run,
      },
    },
    { fetchPolicy: 'network-only' },
  )

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // when pathname changes, update activeNodeArray
  // seems no more needed?
  /*useEffect(() => {
    // need not to navigate or app is blocked
    setActiveNodeArray(activeNodeArray, 'nonavigate')
  }, [activeNodeArray, pathname, setActiveNodeArray])*/

  useEffect(() => {
    let unsubscribe
    if (existsUser) {
      console.log('Vermehrung initializing subsctiptions')
      unsubscribe = initializeSubscriptions({ store })
    }
    return function cleanup() {
      if (unsubscribe && Object.keys(unsubscribe)) {
        Object.keys(unsubscribe).forEach((table) => unsubscribe[table]())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existsUser])

  if (authorizing) {
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

  // unfortunately this results in permanent loading
  // on first load after emptying cache
  /*if (loading && !artsSorted.length) {
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
            <SpinnerText>lade Daten</SpinnerText>
          </SpinnerContainer>
        </Layout>
      </ErrorBoundary>
    )
  }*/

  if (
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
    checkHasuraClaimsOnError({ error, store })
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
      <OnlineDetector />
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

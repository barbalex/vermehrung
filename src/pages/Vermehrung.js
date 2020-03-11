import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'react-error-boundary'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import exists from '../utils/exists'
import Tree from '../components/TreeContainer'
import Data from '../components/Data'
import Filter from '../components/Filter'
import storeContext from '../storeContext'
import firebaseContext from '../firebaseContext'

const Container = styled.div`
  min-height: calc(100vh - 64px);
`
const TempContainer = styled.div`
  min-height: calc(100vh - 64px);
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
  const store = useContext(storeContext)
  const firebase = useContext(firebaseContext)
  console.log('Vermehrung rendering')

  const { activeForm, isPrint, user, initializingFirebase, isSignedIn } = store
  const {
    setOpenNodes,
    setActiveNodeArray,
    widthInPercentOfScreen,
    widthEnforced,
  } = store.tree
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

  // Configure FirebaseUI
  const firebaseUiConfig = {
    // Popup signin flow rather than redirect flow
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function
    signInSuccessUrl: `/Vermehrung/${store.tree.activeNodeArray.join('/')}`,
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      },
    ],
    // this is important because of bug in firebaseui-web-react
    // https://github.com/firebase/firebaseui-web-react/issues/67
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('Vermehrung, firebase, signInSuccessWithAuthResult', {
          authResult,
          redirectUrl,
        })
        return true
      },
    },
  }

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

  console.log('vermehrung page rendering:', {
    user,
    initializingFirebase,
    isSignedIn,
  })

  if (initializingFirebase) {
    return (
      <ErrorBoundary>
        <Layout>
          <TempContainer>autorisiere...</TempContainer>
        </Layout>
      </ErrorBoundary>
    )
  }

  if (!isSignedIn) {
    return (
      <ErrorBoundary>
        <Layout>
          <TempContainer>
            <StyledFirebaseAuth
              uiConfig={firebaseUiConfig}
              firebaseAuth={firebase.auth()}
              uiCallback={ui => ui.disableAutoSignIn()}
            />
          </TempContainer>
        </Layout>
      </ErrorBoundary>
    )
  }

  // for unknown reason user remains null even though it is set BEFORE isSignedIn and initializingFirebase
  // so need to catch that
  if (!user) {
    return (
      <ErrorBoundary>
        <Layout>
          <TempContainer>autorisiere...</TempContainer>
        </Layout>
      </ErrorBoundary>
    )
  }
  // hide resizer when tree is not shown
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
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

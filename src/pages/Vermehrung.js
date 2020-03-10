import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'react-error-boundary'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import axios from 'axios'

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

  const { activeForm, isPrint } = store
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
    signInOptions: [{ provider: firebase.auth.EmailAuthProvider.PROVIDER_ID }],
  }

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  const [isSignedIn, setIsSignedIn] = useState(false)

  // Listen to the Firebase Auth state and set the local state
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async user => {
        console.log('vermehrung page registered user:', user)
        setIsSignedIn(!!user)
        if (user && user.uid) {
          let res
          try {
            res = await axios.get(`https://auth.vermehrung.ch/${user.uid}`)
          } catch (error) {
            // TODO: surface this error
            return console.log(error)
          }
          console.log('response from auth.vermehrung.ch:', res)
          const token = res.data
          firebase
            .auth()
            .signInWithCustomToken(token)
            .catch(error => {
              console.log('Error signing in with custom token:', error)
              // TODO: surface this error to the ui
            })
          // set token to localStorage so authLink picks it up on next db call
          // see: https://www.apollographql.com/docs/react/networking/authentication/#header
          window.localStorage.setItem('token', token)
        }
      })
    return () => {
      unregisterAuthObserver()
    }
  }, [firebase])

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

  console.log('vermehrung page rendering')

  if (!isSignedIn) {
    return (
      <ErrorBoundary>
        <Layout>
          <Container>
            <StyledFirebaseAuth
              uiConfig={firebaseUiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Container>
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

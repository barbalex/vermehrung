import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import { login, isAuthenticated } from '../utils/auth'
import Tree from '../components/TreeContainer'
import Data from '../components/Data'
import storeContext from '../storeContext'

const Container = styled.div`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`
const StyledReflexContainer = styled(ReflexContainer)`
  height: calc(100vh - 64px) !important;
  .reflex-splitter {
    background-color: #fffde7 !important;
    border-right: none !important;
    border-left: none !important;
    background-color: rgba(74, 20, 140, 0.1) !important;
    width: 7px !important;
  }
  .reflex-splitter:hover {
    background-color: #fff59d !important;
    cursor: col-resize !important;
  }
`

const Vermehrung = ({ location }) => {
  const store = useContext(storeContext)
  const { setActiveNodeArray, setOpenNodes } = store.tree

  const { pathname } = location
  const activeNodeArray = activeNodeArrayFromPathname(pathname)
  // on first render set openNodes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
  }, [])
  // when pathname changes, update activeNodeArray
  useEffect(() => {
    setActiveNodeArray(activeNodeArray)
  }, [pathname])

  if (!isAuthenticated()) {
    login()
    return <p>Öffne login...</p>
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledReflexContainer orientation="vertical">
            <ReflexElement
              flex={0.3}
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <Tree />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <Data />
            </ReflexElement>
          </StyledReflexContainer>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

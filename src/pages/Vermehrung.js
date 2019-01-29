import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import activeNodeArrayFromPathname from '../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../utils/openNodesFromActiveNodeArray'
import Tree from '../components/Tree'
import Data from '../components/Data'
import storeContext from '../storeContext'

const Container = styled.div`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`
const StyledReflexContainer = styled(ReflexContainer)`
  height: calc(100vh - 64px) !important;
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

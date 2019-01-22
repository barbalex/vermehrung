import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../../../components/ErrorBoundary'
import Tree from './Tree'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right-color: rgb(46, 125, 50);
  border-right-width: 1px;
  border-right-style: solid;
  border-left-color: rgb(46, 125, 50);
  border-left-width: 1px;
  border-left-style: solid;
  overflow: hidden;
  @media print {
    display: none !important;
  }
`
const InnerTreeContainer = styled.div`
  height: 100%;
  overflow: hidden;
`

const ArtTree = () => {
  return (
    <ErrorBoundary>
      <Container>
        <InnerTreeContainer>
          <Tree />
        </InnerTreeContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ArtTree)

import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import get from 'lodash/get'

import ErrorBoundary from '../../../components/ErrorBoundary'

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
const Node = styled.div`
  padding-left: ${props => `${props.level * 12 - 12}px`};
`

const ArtTree = ({ data, pathname }) => {
  const aeArten = get(data, 'hasura.ae_art', [])
  // eslint-disable-next-line no-unused-vars
  const [first, ...path] = pathname.split('/')
  // TODO:
  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click

  return (
    <ErrorBoundary>
      <Container>
        <Node level={1}>Arten</Node>
        {aeArten.map(art => (
          <Node level={2} key={art.id}>
            {art.name}
          </Node>
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ArtTree)

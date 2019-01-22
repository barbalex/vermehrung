import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import get from 'lodash/get'

import ErrorBoundary from '../../../components/ErrorBoundary'
import ArtList from './ArtList'

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

const ArtTree = ({ data, path }) => {
  const aeArten = get(data, 'hasura.ae_art', [])
  console.log('ArtTree', { aeArten, aeArt0: aeArten[0], path })

  return (
    <ErrorBoundary>
      <Container>
        <div>
          Arten
          <ArtList arten={aeArten} />
        </div>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ArtTree)

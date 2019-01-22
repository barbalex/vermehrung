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
const FolderNode = styled(Node)`
  font-weight: 600;
`

const ArtTree = ({ data }) => {
  const arten = get(data, 'hasura.ae_art', [])
  const personen = get(data, 'hasura.person', [])
  const sOrte = get(data, 'hasura.s_ort', [])
  const zEW = get(data, 'hasura.zaehlung_einheit_werte', [])
  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click

  return (
    <ErrorBoundary>
      <Container>
        <FolderNode level={1}>Arten</FolderNode>
        {arten.map(a => (
          <Node level={2} key={a.id}>
            {a.name}
          </Node>
        ))}
        <FolderNode level={1}>Sammel-Orte</FolderNode>
        {sOrte.map(p => (
          <Node level={2} key={p.id}>
            {p.name}
          </Node>
        ))}
        <FolderNode level={1}>Personen</FolderNode>
        {personen.map(p => (
          <Node level={2} key={p.id}>
            {p.name}
          </Node>
        ))}
        <FolderNode level={1}>Werte-Listen</FolderNode>
        <FolderNode level={2}>Zählungen: Einheiten</FolderNode>
        {zEW.map(p => (
          <Node level={3} key={p.id}>
            {p.text}
          </Node>
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ArtTree)

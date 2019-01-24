import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'

import ErrorBoundary from '../../../components/ErrorBoundary'
import storeContext from '../../../storeContext'
import Row from './Row'

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
const StyledList = styled(List)`
  overflow-x: hidden !important;
`
const Node = styled.div`
  padding-left: ${props => `${props.level * 12 - 12}px`};
`
const FolderNode = styled(Node)`
  font-weight: 600;
`

const singleRowHeight = 23

const ArtTree = ({ data, dimensions }) => {
  console.log('ArtTree', { data })
  const store = useContext(storeContext)
  const { activeNodeArray, setNodes, openNodes } = store.tree
  const gaerten = get(data, 'hasura.garten', [])
  const arten = get(data, 'hasura.ae_art', [])
  const herkuenfte = get(data, 'hasura.herkunft', [])
  const lieferungen = get(data, 'hasura.lieferung', [])
  const personen = get(data, 'hasura.person', [])
  const masseinheitWerte = get(data, 'hasura.masseinheit_werte', [])
  const zaehleinheitWerte = get(data, 'hasura.zaehleinheit_werte', [])
  const lieferungZwischenlagerWerte = get(
    data,
    'hasura.lieferung_zwischenlager_werte',
    [],
  )
  const lieferungStatusWerte = get(data, 'hasura.lieferung_status_werte', [])
  const lieferungTypWerte = get(data, 'hasura.lieferung_typ_werte', [])
  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click

  const nodes = []
  setNodes(nodes)

  useEffect(() => {
    const index = findIndex(nodes, node => isEqual(node.url, activeNodeArray))
    listRef.current.scrollToItem(index)
  }, [activeNodeArray, nodes])

  const height = isNaN(dimensions.height) ? 250 : dimensions.height
  const width = isNaN(dimensions.width) ? 250 : dimensions.width

  const listRef = React.createRef()

  return (
    <ErrorBoundary>
      <Container>
        <StyledList
          height={height}
          itemCount={nodes.length}
          itemSize={singleRowHeight}
          width={width}
          ref={listRef}
        >
          {({ index, style }) => {
            const node = nodes[index]

            return <Row key={index} style={style} index={index} node={node} />
          }}
        </StyledList>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ArtTree)

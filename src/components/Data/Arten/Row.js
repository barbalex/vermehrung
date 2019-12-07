import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'

import storeContext from '../../../storeContext'

const singleRowHeight = 44
const Row = styled.div`
  min-height: ${singleRowHeight};
  border-top: 1px solid rgba(74, 20, 140, 0.1);
  border-bottom: 1px solid rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  margin: -1px 0;
  padding: 10px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`

const Arten = ({ row, style }) => {
  const store = useContext(storeContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row key={row.id} onClick={onClickRow} style={style}>
      {get(row, 'art_ae_art.name')}
    </Row>
  )
}

export default observer(Arten)

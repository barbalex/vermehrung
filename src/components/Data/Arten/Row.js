import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'

const Row = styled.div`
  min-height: 20px;
  border-top: 1px solid rgba(74, 20, 140, 0.1);
  border-bottom: 1px solid rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  margin: -1px 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`

const Arten = ({ row }) => {
  const store = useContext(storeContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <ErrorBoundary>
      <Row key={row.id} onClick={onClickRow}>
        {get(row, 'art_ae_art.name')}
      </Row>
    </ErrorBoundary>
  )
}

export default observer(Arten)

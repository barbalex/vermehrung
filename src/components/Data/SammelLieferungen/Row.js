import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { first as first$ } from 'rxjs/operators'

import { StoreContext } from '../../../models/reactUtils'

const singleRowHeight = 48
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${singleRowHeight};
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: ${(props) => (props['data-last'] ? '1px' : 'thin')} solid
    rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  margin: -1px 0;
  padding: 10px;
  cursor: pointer;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`

const SLRows = ({ row, style, last }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  const [label, setLabel] = useState('')
  useEffect(() => {
    row.label
      .pipe(first$())
      .toPromise()
      .then((label) => setLabel(label))
  }, [row.label])

  return (
    <Row key={row.id} onClick={onClickRow} style={style} data-last={last}>
      <div>{label}</div>
    </Row>
  )
}

export default observer(SLRows)

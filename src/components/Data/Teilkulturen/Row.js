import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import StoreContext from '../../../storeContext'
import teilkulturLabelFromTeilkultur from '../../../utils/teilkulturLabelFromTeilkultur'
import getConstants from '../../../utils/constants'

const constants = getConstants()

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${constants.singleRowHeight};
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

const Teilkulturen = ({ row, style, last }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row key={row.id} onClick={onClickRow} style={style} data-last={last}>
      <div>{teilkulturLabelFromTeilkultur({ teilkultur: row })}</div>
    </Row>
  )
}

export default observer(Teilkulturen)

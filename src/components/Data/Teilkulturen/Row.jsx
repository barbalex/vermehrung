import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { teilkulturLabelFromTeilkultur } from '../../../utils/teilkulturLabelFromTeilkultur.js'
import { constants } from '../../../utils/constants.js'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${constants.singleRowHeight};
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: thin solid rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  box-sizing: border-box;
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

export const TeilkulturRow = observer(({ row, style }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{teilkulturLabelFromTeilkultur({ teilkultur: row })}</div>
    </Row>
  )
})

import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { first as first$ } from 'rxjs/operators'

import StoreContext from '../../../storeContext'
import constants from '../../../utils/constants'

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

const Arten = ({ row, style, last }) => {
  const store = useContext(StoreContext)
  const { herkunftIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    herkunftIdInActiveNodeArray
      ? row.labelUnderHerkunft
          .pipe(first$())
          .toPromise()
          .then((label) => {
            if (!isActive) return

            setLabel(label)
          })
      : row.label
          .pipe(first$())
          .toPromise()
          .then((label) => {
            if (!isActive) return

            setLabel(label)
          })

    return () => {
      isActive = false
    }
  }, [herkunftIdInActiveNodeArray, row])

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row key={row.id} onClick={onClickRow} style={style} data-last={last}>
      <div>{label}</div>
    </Row>
  )
}

export default observer(Arten)

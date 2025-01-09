import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { first as first$ } from 'rxjs/operators'

import StoreContext from '../../../mobxStoreContext.js'
import constants from '../../../utils/constants.js'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${constants.singleRowHeight};
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: ${(props) => (props['data-last'] ? '1px' : 'thin')} solid
    rgba(74, 20, 140, 0.1);
  border-collapse: collapse;
  box-sizing: border-box;
  margin: -1px 0;
  padding: 10px;
  cursor: pointer;
  color: ${(props) =>
    props['data-inaktiv'] ? 'rgba(0, 0, 0, 0.35)' : 'inherit'};
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`

const Kulturen = ({ row, style, last }) => {
  const store = useContext(StoreContext)
  const { artIdInActiveNodeArray, gartenIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    artIdInActiveNodeArray
      ? row.labelUnderArt
          .pipe(first$())
          .toPromise()
          .then((label) => {
            if (!isActive) return

            setLabel(label)
          })
      : gartenIdInActiveNodeArray
      ? row.labelUnderGarten
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
  }, [artIdInActiveNodeArray, gartenIdInActiveNodeArray, row])

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row
      key={row.id}
      onClick={onClickRow}
      style={style}
      data-last={last}
      data-inaktiv={row?.aktiv === false}
    >
      <div>{label}</div>
    </Row>
  )
}

export default observer(Kulturen)

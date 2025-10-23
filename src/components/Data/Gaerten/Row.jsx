import { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { constants } from '../../../utils/constants.js'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${constants.singleRowHeight};
  border-bottom: 1px solid rgba(74, 20, 140, 0.2);
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

export const GartenRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    row.label
      .pipe(first$())
      .toPromise()
      .then((label) => {
        if (!isActive) return

        setLabel(label)
      })

    return () => {
      isActive = false
    }
  }, [row])

  const onClickRow = useCallback(
    () => setActiveNodeArray([...activeNodeArray, row.id]),
    [activeNodeArray, row.id, setActiveNodeArray],
  )

  return (
    <Row
      key={row.id}
      onClick={onClickRow}
      style={style}
      data-inaktiv={row?.aktiv === false}
    >
      <div>{label}</div>
    </Row>
  )
})

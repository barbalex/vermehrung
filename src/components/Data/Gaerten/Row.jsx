import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import { container } from '../Arten/Row.module.css'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 48px;
  border-bottom: 1px solid rgba(74, 20, 140, 0.2);
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

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  return (
    <Row
      key={row.id}
      onClick={onClickRow}
      style={{
        ...style,
        color: row?.aktiv === false ? 'rgba(0, 0, 0, 0.35)' : 'inherit',
      }}
    >
      <div>{label}</div>
    </Row>
  )
})

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { teilkulturLabelFromTeilkultur } from '../../../utils/teilkulturLabelFromTeilkultur.js'

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

export const TeilkulturRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

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

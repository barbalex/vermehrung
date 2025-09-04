import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { tableFilter } from '../../../utils/tableFilter.js'
import { constants } from '../../../utils/constants.js'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${constants.singleRowHeight};
  border-top: thin solid rgba(74, 20, 140, 0.1);
  border-bottom: thin solid rgba(74, 20, 140, 0.1);
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

export const RootRow = observer(({ row, style }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store
  const { setActiveNodeArray } = store.tree

  const filter = store.filter?.[row.table] ?? {}

  // query needs to be observable
  // without, on first login, count is (generally) not yet available
  // because data is still being synced
  const [count, setCount] = useState(0)
  useEffect(() => {
    const subscription = db
      .get(row.table)
      .query(...tableFilter({ store, table: row.table }))
      .observe()
      .subscribe((result) => {
        setCount(result.length)
      })

    return () => subscription?.unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, row.table, store, ...Object.values(filter)])

  const onClickRow = useCallback(
    () => setActiveNodeArray(row.url),
    [row.url, setActiveNodeArray],
  )

  return (
    <Row
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{`${row.name} (${count})`}</div>
    </Row>
  )
})

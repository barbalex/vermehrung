import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { tableFilter } from '../../../utils/tableFilter.js'

import { container } from '../Arten/Row.module.css'

export const RootRow = observer(({ style, row }) => {
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

  const onClickRow = () => setActiveNodeArray(row.url)

  return (
    <div
      className={container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{`${row.name} (${count})`}</div>
    </div>
  )
})

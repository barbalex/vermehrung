import { useState, useEffect, useMemo } from 'react'
import { atom, useAtomValue } from 'jotai'

import {
  dbAtom,
  filterTableAtoms,
  setActiveNodeArray,
} from '../../../store/index.js'
import { tableFilter } from '../../../utils/tableFilter.js'

import styles from '../Arten/Row.module.css'

export const RootRow = ({ style, row }) => {
  const db = useAtomValue(dbAtom)
  const filterAtom = useMemo(
    () => filterTableAtoms[row.table] ?? atom({}),
    [row.table],
  )
  const filter = useAtomValue(filterAtom)

  // query needs to be observable
  // without, on first login, count is (generally) not yet available
  // because data is still being synced
  const [count, setCount] = useState(0)
  useEffect(() => {
    const subscription = db
      .get(row.table)
      .query(...tableFilter({ table: row.table }))
      .observe()
      .subscribe((result) => {
        setCount(result.length)
      })

    return () => subscription?.unsubscribe?.()
  }, [db, row.table, filter])

  const onClickRow = () => setActiveNodeArray(row.url)

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{`${row.name} (${count})`}</div>
    </div>
  )
}

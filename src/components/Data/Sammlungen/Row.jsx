import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import styles from '../Arten/Row.module.css'

export const SammlungRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { herkunftIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    herkunftIdInActiveNodeArray ?
      row.labelUnderHerkunft
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

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{label}</div>
    </div>
  )
})

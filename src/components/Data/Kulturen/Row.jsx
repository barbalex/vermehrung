import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import styles from '../Arten/Row.module.css'

export const KulturRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { artIdInActiveNodeArray, gartenIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    artIdInActiveNodeArray ?
      row.labelUnderArt
        .pipe(first$())
        .toPromise()
        .then((label) => {
          if (!isActive) return

          setLabel(label)
        })
    : gartenIdInActiveNodeArray ?
      row.labelUnderGarten
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

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={{
        ...style,
        color: row?.aktiv === false ? 'rgba(0, 0, 0, 0.35)' : 'inherit',
      }}
    >
      <div>{label}</div>
    </div>
  )
})

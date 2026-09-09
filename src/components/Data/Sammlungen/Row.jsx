import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { first as first$ } from 'rxjs/operators'

import {
  store,
  herkunftIdInActiveNodeArrayAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'

import styles from '../Arten/Row.module.css'

export const SammlungRow = ({ style, index, rows }) => {
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )

  const row = rows[index]

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

  const onClickRow = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, row.id])
  }

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
}

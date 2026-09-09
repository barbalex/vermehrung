import { useState, useEffect } from 'react'
import { first as first$ } from 'rxjs/operators'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'

import styles from './Row.module.css'

export const ArtRow = ({ style, index, rows }) => {
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

  const onClickRow = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), row.id])

  return (
    <div
      key={row.id}
      onClick={onClickRow}
      style={style}
      className={styles.container}
    >
      <div>{label}</div>
    </div>
  )
}
